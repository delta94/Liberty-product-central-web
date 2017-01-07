import * as React from 'react';
import styles from './index.module.scss';

import logo from '@/images/logo/LibertyLogo_BigBell_Horizontal_Vector.svg';
import { Form, Input, Button, Row, Col } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { CurrentUserConsumer } from 'client/contexts/CurrentUserContext';
import { Mutation } from 'react-apollo';
import { LOGIN } from './index.mutations';
import { ILoggedInUser } from 'client/interfaces/user';
import GraphQLError from '../GraphQLError';
import { some } from 'lodash';

interface IBoomerangProps {
  form: WrappedFormUtils;
}
interface IState {
  showModal: boolean;
}

export interface ILoginResponse {
  user: ILoggedInUser;
  token: string;
}

interface ILoginResponses {
  login: ILoginResponse;
}

interface ILoginVariables {
  email: string;
  password: string;
}

class Login extends React.Component<IBoomerangProps & RouteComponentProps<any>, IState> {
  state = {
    showModal: false,
    isSubmitForm: false,
  };

  onSubmit = (e: any) => {
    e.preventDefault();
    if (this.props.form.getFieldValue('email') === 'external@libertyfurn.com') {
      this.props.history.push('/partners/wizard');
    } else {
      this.props.history.push('/corporate');
    }
  };

  forgotPassword = () => {
    console.log('forgotPassword');
  };

  hasRole = (roles: string[], role: string) => {
    return some(roles, userRole => userRole === role);
  };

  render() {
    const { form } = this.props;
    const { isSubmitForm } = this.state;

    return (
      <div className={styles.background}>
        <div style={{ backgroundColor: 'rgba(255,255,255,.75)' }}>
          <img src={logo} style={{ maxWidth: 350, margin: '20px 0 20px 50px' }} alt="" />
        </div>
        <CurrentUserConsumer>
          {userContext => (
            <Mutation<ILoginResponses, ILoginVariables> mutation={LOGIN}>
              {(login, { error }) => {
                const handleSubmit = (e: React.FormEvent<any>) => {
                  e.preventDefault();
                  const form = this.props.form;
                  form.validateFields(async (err: any, values: any) => {
                    if (err) {
                      return false;
                    }

                    const result = await login({ variables: values });
                    if (result && result.data) {
                      form.resetFields();
                      const data = result.data.login;
                      if (userContext) {
                        userContext.onLogin(data.user, data.token);
                        localStorage.setItem('token', data.token);
                      }
                      console.log('data.user.userRoles', data.user.userRoles);
                      if (this.hasRole(data.user.userRoles, 'Corporate')) this.props.history.push('/corporate/users');
                      else if (this.hasRole(data.user.userRoles, 'Administrator')) this.props.history.push('/corporate/users');
                      else if (this.hasRole(data.user.userRoles, 'Vendor')) this.props.history.push('/partners/wizard');
                      else if (this.hasRole(data.user.userRoles, 'XPO')) this.props.history.push('/xpo/utils');
                      else if (this.hasRole(data.user.userRoles, 'Sales Presentation')) this.props.history.push('/sales-presentations');
                      else if (this.hasRole(data.user.userRoles, 'Order Transfer')) this.props.history.push('/support/order-transfer');
                      else if (this.hasRole(data.user.userRoles, 'Order Backlog')) this.props.history.push('/support/order-backlog');
                    }
                  });
                };

                return (
                  <React.Fragment>
                    <div className={styles.login}>
                      {error && <GraphQLError error={error} />}
                      <div className={styles.title}>Please Login</div>
                      <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
                        <FormItem hasFeedback>
                          {form.getFieldDecorator('email', {
                            rules: [
                              {
                                type: 'email',
                                message: 'The input is not a valid e-mail address',
                              },
                              {
                                required: true,
                                message: 'Please input your e-mail address',
                              },
                            ],
                          })(<Input size="default" placeholder="Email Address" />)}
                        </FormItem>
                        <FormItem hasFeedback>
                          {form.getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your password' }],
                          })(<Input size="default" type="password" placeholder="Password" />)}
                        </FormItem>
                        <Row type="flex" gutter={16} align="middle">
                          <Col>
                            <div className="form-actions">
                              <Button type="primary" className="width-150 mr-4" htmlType="submit" loading={isSubmitForm}>
                                Login
                              </Button>
                            </div>
                          </Col>
                          <Col>
                            <div className="mb-2">
                              <div className="utils__link--blue" onClick={this.forgotPassword}>
                                Forgot password
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                    {/* <!---start footer area---> */}
                    <div className={styles.footerWrapper}>
                      <div className="container">
                        <div className="row">
                          <div className="col-xl-12">
                            <div className="copyright-area">
                              <p>
                                Copyright 2019 <span>|</span> Terms & Conditions <span>|</span> Privacy Policy / Legal Statement© 2019 All Rights Reserved
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              }}
            </Mutation>
          )}
        </CurrentUserConsumer>
      </div>
    );
  }
}

export default Form.create()(withRouter(Login as any));
