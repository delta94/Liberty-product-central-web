import React, { Context } from 'react';

import { omit } from 'lodash';
import { ILoggedInUser } from '../interfaces/user';
// import * as history from 'history';
import { RouteComponentProps, withRouter } from 'react-router';

export interface ICurrentUserContext {
  user: ILoggedInUser;
  onLogin(user: ILoggedInUser | undefined, token?: string): void;
  onLogout(): void;
  isLoggedIn: boolean;
  currentMenu: string[];
}

export const CurrentUserContext: Context<ICurrentUserContext> = React.createContext<ICurrentUserContext>({} as any);
const { Provider, Consumer } = CurrentUserContext;

export default <P extends {}>(Component: React.ComponentClass<P & ICurrentUserContext> | React.StatelessComponent<P & ICurrentUserContext>): any => {
  class WrappedComponent extends React.Component<P & ICurrentUserContext> {
    render() {
      return (
        <Consumer>
          {context => {
            return <Component {...this.props} {...context} />;
          }}
        </Consumer>
      );
    }
  }
  return WrappedComponent;
};

// tslint:disable-next-line:only-arrow-functions
export function withUser<P extends ICurrentUserContext>(Component: React.ComponentType<P>) {
  // tslint:disable-next-line:only-arrow-functions
  return function ThemedComponent(props: Pick<P, Exclude<keyof P, keyof ICurrentUserContext>>) {
    return <Consumer>{context => <Component {...(props as P)} {...context} />}</Consumer>;
  };
}

class CurrentUserProvider extends React.Component<RouteComponentProps<any>> {
  // constructor(props: RouteComponentProps<any>) {
  //   super(props);
  // }
  state = {
    currentUser: {} as ILoggedInUser,
    isLoggedIn: localStorage.getItem('token') ? true : false,
    currentMenu: ['0'],
  };

  componentDidMount() {
    const user = localStorage.getItem('user');
    if (user) {
      this.setState({ currentUser: omit(JSON.parse(user), '__typename') });
    }
  }

  handleLogin = (user: ILoggedInUser, token?: string) => {
    localStorage.setItem('user', JSON.stringify(omit(user, '__typename')));
    localStorage.setItem('token', token ? token : '');
    this.setState({ currentUser: user, isLoggedIn: true });
  };

  handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.setState({ currentUser: undefined, isLoggedIn: false });
    this.props.history.push('/');
  };

  render() {
    return (
      <Provider
        value={{
          user: this.state.currentUser,
          onLogin: this.handleLogin,
          onLogout: this.handleLogout,
          isLoggedIn: this.state.isLoggedIn,
          currentMenu: this.state.currentMenu,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const wrappedProvider = withRouter(CurrentUserProvider);

export { wrappedProvider as CurrentUserProvider, Consumer as CurrentUserConsumer };
