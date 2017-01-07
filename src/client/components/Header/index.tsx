import * as React from 'react';
import logo from '@/images/svgs/LibertyLogo_BigBell_Horizontal_White_Text_Vector.svg';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { Button, Row, Col, Icon, Menu } from 'antd';
import { useLogoutMutation } from 'graphql';
import { CurrentUserContext } from 'client/contexts/CurrentUserContext';
import { some } from 'lodash';
import { useState, useEffect } from 'react';

const routes = [
  {
    key: '/corporate/users',
    name: 'Users',
    role: 'Administrator',
  },
  {
    key: '/corporate/vendors',
    name: 'Vendors',
    role: 'Administrator',
  },
  {
    key: '/corporate/products',
    name: 'Products',
    role: 'Administrator',
  },
  {
    key: '/sales-presentations',
    name: 'Sales Presentation',
    role: 'Sales Presentation',
  },
  {
    key: '/support/order-transfer',
    name: 'Order Transfer',
    role: 'Order Transfer',
  },
  {
    key: '/xpo/utils',
    name: 'XPO Utils',
    role: 'XPO',
  },
];

export interface HeaderProps extends RouteComponentProps {}

const Header = (props: HeaderProps) => {
  const [loggingOut, setLoggingOut] = React.useState(false);
  const userContext = React.useContext(CurrentUserContext);
  const [logout] = useLogoutMutation();
  const [currentMenu, setCurrentMenu] = useState(['0']);

  useEffect(() => {
    // const menu = localStorage.getItem('cmi');
    // const selectedMenu = [menu ? menu : '0'];
    // if (currentMenu[0] !== selectedMenu[0]) {
    //   localStorage.setItem('cmi', selectedMenu[0]);
    //   setCurrentMenu(selectedMenu);
    // }
  }, [props.location.pathname]);

  const hasRole = (role: string) => {
    return some(userContext.user.userRoles, userRole => userRole === role);
  };

  const menuSelected = ({ selectedKeys }) => {
    localStorage.setItem('cmi', selectedKeys[0]);
    setCurrentMenu(selectedKeys);
  };

  console.log('path', props.location.pathname);
  return (
    <Row type="flex" style={{ width: '100vw', textAlign: 'center', alignItems: 'center', backgroundColor: '#383c4f', padding: '20px 20px' }}>
      <Col style={{ flex: 1, minWidth: 150, maxWidth: 350 }}>
        <img src={logo} style={{ maxWidth: 350 }} alt="" />
      </Col>
      <Col style={{ flex: 5 }}>
        <Row type="flex" style={{ justifyItems: 'flex-end', alignItems: 'center' }}>
          <Col style={{ flex: 1, textAlign: 'right', paddingRight: 10 }}>
            <Menu
              mode="horizontal"
              selectedKeys={[props.location.pathname]}
              onSelect={menuSelected}
              style={{ lineHeight: '40px', backgroundColor: 'rgb(56, 60, 79)' }}
            >
              {/* {routes.map(route => {
                if(hasRole(route.role)) {
                  return (
                    <Menu.Item key=>
                  <Link to="/corporate/users">Users</Link>
                </Menu.Item>
                  )
                }
              })} */}
              {hasRole('Administrator') && (
                <Menu.Item key="/corporate/users">
                  <Link to="/corporate/users">Users</Link>
                </Menu.Item>
              )}
              {hasRole('Administrator') && (
                <Menu.Item key="/corporate/vendors">
                  <Link to="/corporate/vendors">Vendors</Link>
                </Menu.Item>
              )}
              {hasRole('Administrator') && (
                <Menu.Item key="/corporate/products">
                  <Link to="/corporate/products">Products</Link>
                </Menu.Item>
              )}
              {hasRole('Sales Presentation') && (
                <Menu.Item key="/sales-presentations">
                  <Link to="/sales-presentations/list">Sales Presentations</Link>
                </Menu.Item>
              )}
              {hasRole('Order Transfer') && (
                <Menu.Item key="/support/order-transfer">
                  <Link to="/support/order-transfer">Order Transfer</Link>
                </Menu.Item>
              )}
              {hasRole('XPO') && (
                <Menu.Item key="/xpo/utils">
                  <Link to="/xpo/utils">XPO Utilities</Link>
                </Menu.Item>
              )}
            </Menu>
          </Col>
          <Col>
            <div style={{ float: 'right', position: 'relative' }}>
              <Row type="flex" align="bottom" style={{ flexDirection: 'column', color: 'white' }}>
                <Col style={{ marginBottom: 10, fontWeight: 700, fontSize: '15px' }}>
                  <Link to="/account">
                    <Icon type="user" style={{ marginRight: 5 }} />
                    Welcome {userContext.user.firstName}!
                  </Link>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    size="small"
                    icon="logout"
                    loading={loggingOut}
                    onClick={async e => {
                      e.preventDefault();
                      setLoggingOut(true);
                      await logout();
                      setLoggingOut(false);
                      localStorage.removeItem('user');
                      localStorage.removeItem('token');
                      props.history.push('/');
                    }}
                  >
                    Logout
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default withRouter(Header);
