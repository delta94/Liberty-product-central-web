import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import Login from '@/components/Login';
import Partners from './routes/partners';
import Administration from './routes/corporate/Administration';
import Corporate from '@/routes/corporate';
import Support from '@/routes/support';
import Account from '@/components/Users/account';
import SalesPresentationsPage from '@/routes/sales';

import '@/assets/styles';
// import '@/assets/antd.less';
import './App.css';
import './scss/antd.styles.scss';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import PrivateRoute from './components/Routes/PrivateRoute';
import { createBrowserHistory } from 'history';
import Xpo from './routes/Xpo';
import Header from './components/Header';

//const history = createBrowserHistory();

const history = createBrowserHistory();

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  if (token) {
    const headers = operation.getContext().headers || {};
    operation.setContext({
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    });
  }
  // tslint:disable-next-line:no-null-keyword
  return forward ? forward(operation) : null;
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) => {
          switch (message) {
            case 'Please Log In.':
            case 'Not Authenticated.':
            case 'Not Authorized.':
              history.push('/');
              break;
            case 'User Job Not Found.':
              history.push('/partners/wizard/step-1');
              break;
            default:
              console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
              break;
          }
          return null;
        });
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    authMiddleware,
    new HttpLink({
      uri: '/graphql',
      credentials: 'include',
    }),
  ]),
  cache: new InMemoryCache(),
});
class App extends Component {
  render() {
    // console.log('process.env.REACT_APP_GRAPHQL_SERVER', process.env.REACT_APP_GRAPHQL_SERVER);
    return (
      <ApolloProvider client={client}>
        <Router history={history}>
          <CurrentUserProvider>
            <Switch>
              <Route path="/" exact component={Login} />
              <PrivateRoute userRole="Administrator" path="/corporate" component={Corporate} />
              <PrivateRoute userRole="Administrator" path="/corporate/administration" exact component={Administration} />
              <PrivateRoute userRole="Vendor" path="/partners" component={Partners} />
              <PrivateRoute userRole="XPO" path="/xpo" component={Xpo} />
              <PrivateRoute userRole="Sales Presentation" path="/sales-presentations" component={SalesPresentationsPage} />
              <PrivateRoute userRole="Order Transfer" path="/support" component={Support} />
              <PrivateRoute path="/account" component={Account} />
            </Switch>
          </CurrentUserProvider>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
