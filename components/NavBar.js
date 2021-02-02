import React, { useState, useEffect } from 'react';
import { Menu, Dropdown } from 'antd';
import { useRouter } from 'next/router';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Row } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';
import { getTokenType, logout } from '../helpers/auth';
import Link from 'next/link';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  textDecoration: 'none';
  color: 'gray'
`

const MyNavBar = props => {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const hideList = ['login', 'register'];

  const gotToLogin = () => {
    router.push('/login');
  };

  const goToRegister = () => {
    router.push('/register');
  }

  const goToHomePage = () => {
    router.push('/');
  }

  const logoutAndPushRouter = async () => {
    await logout()
    setIsLoggedIn(false);
    router.push('/');
  }

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      let type = getTokenType();
      console.log('type', type);
      if (type === 'client') {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [router]);

  const profileDropdown = () => (
    <Menu style={{width: 150}}>
      <Menu.Item>
        <p className={css(styles.link)} onClick={() => logoutAndPushRouter()}>Logout</p>
      </Menu.Item>
    </Menu>
  )

  useEffect(() => {
    var prefix = window.location.pathname.slice(1).split('/')[0];
    console.log(prefix);
    if (prefix) {
      setSelectedKey(prefix);
    } else {
      setSelectedKey("home");
    }
  }, [router.pathname]);

  if (hideList.includes(selectedKey)) {
    return null;
  } else {
    return (
      <div style={{paddingLeft: 40, paddingRight: 40}}>
        <Navbar expand="md" style={{height: 70}}>
          <NavbarBrand href="/">
            <h4 className={css(styles.logo)}>Kitchen App</h4>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar style={{backgroundColor: 'white', zIndex: 999}}>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <StyledLink href="/"><NavLink active={selectedKey === 'home'}>Home</NavLink></StyledLink>
                {/* <NavLink active={selectedKey === 'home'} activeClassName="active">Home</NavLink> */}
              </NavItem>
              <NavItem>
                <StyledLink href="/recipes"><NavLink active={selectedKey === 'recipes'}>Recipes</NavLink></StyledLink>
              </NavItem>
              {
                isLoggedIn && (
                  <>
                    <NavItem>
                      <StyledLink href="/meals"><NavLink active={selectedKey === 'meals'}>Meals</NavLink></StyledLink>
                    </NavItem>
                    <NavItem>
                      <StyledLink href="/lists"><NavLink active={selectedKey === 'lists'}>Lists</NavLink></StyledLink>
                    </NavItem>
                  </>
                )
              }
            </Nav>
            <Nav>
              { isLoggedIn ? (
                <Dropdown trigger="click" overlay={profileDropdown()} overlayStyle={{zIndex: 10000}} placement="bottomLeft">
                  <img className={css(styles.profileDropdown)} src={"https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"} />
                </Dropdown>
              ): (
                <>
                  <p className={css(styles.link)} onClick={() => gotToLogin()}>Login</p>
                  <p className={css(styles.link)}>/</p>
                  <p className={css(styles.link)} onClick={() => goToRegister()}>Register</p>
                </>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    color: '#F43445',
    marginRight: 50,
    fontWeight: 'bold',
    fontFamily: 'Sansita Swashed',
    fontSize: 28,
    cursor: 'pointer'
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginTop: 5
  },
  link: {
    color: '#808080',
    marginBottom: 0,
    marginRight: 10,
    fontSize: 14,
    cursor: 'pointer',
    ":hover": {
      color: '#F43445'
    }
  },
  profileDropdown: {
    border: '1px solid #dddddd',
    height: 35,
    width: 35,
    borderRadius: 30,
    objectFit: 'cover',
    alignSelf: 'center',
    cursor: 'pointer'
  }
})


export default MyNavBar;