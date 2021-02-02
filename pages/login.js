import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useRouter } from 'next/router';
import Axios from 'axios';
import { message, Spin } from 'antd';
import { checkTokenType } from '../helpers/auth';

const Login = props => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (checkTokenType('user')) {
      router.push('/');
    }
  }, []);

  const makeAPIRequest = async () => {
    try {
      setLoading(true);
      let resp = await Axios({
        method: 'POST',
        url: "http://localhost:3000/api/login",
        data: { email: email, password: password},
        headers: { 'content-type': 'application/json' }
      });
      let accessToken = resp.data.payload['access_token'];
      let refreshToken = resp.data.payload['refresh_token'];
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setLoading(false);
      if (localStorage.getItem('redirectUrl')) {
        let redirectUrl = localStorage.getItem('redirectUrl');
        localStorage.removeItem('redirectUrl');
        router.push(redirectUrl);
      } else {
        router.push('/')
      }
    } catch(err) {
      console.log(err.response);
      setLoading(false);
      if (err.response && err.response.data.message) {
        message.error(err.response.data.message);
      } else {
        message.error('Something went wrong');
      }
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    makeAPIRequest();
    // router.push('/');
  }

  const goToRegister = () => {
    router.push('/register');
  }

  return (
    <Spin spinning={loading} delay={0} size="large">
      <div className={css(styles.mainContainer)}>
        <h1 className={css(styles.header)}>Welcome back,</h1>
        <h5 style={{marginBottom: 50}}>Sign in to continue.</h5>
        <form style={{flexDirection: 'column', display: 'flex'}} onSubmit={(e) => handleLogin(e)}>
          <h6>Email</h6>
          <input className={css(styles.inputContainer)} type="text" placeholder="Enter email..." value={email} onChange={e => setEmail(e.target.value)} required />
          <h6>Password</h6>
          <input className={css(styles.inputContainer)} type="password" placeholder="Enter password..." value={password} onChange={e => setPassword(e.target.value)} required/>
          <input className={css(styles.button)} type="submit" value="Sign In" />
        </form>
        <p style={{marginTop: 20, color: '#F43445', cursor: 'pointer'}} onClick={() => goToRegister()}>Need an account?</p>
      </div>
    </Spin>
  )
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 900,
  },
  header: {
    color: '#F43445',
    fontWeight: 'bold',
    fontFamily: 'Sansita Swashed',
    fontSize: 40,
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: 'white',
    minWidth: 300,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    border: 'none',
    outline: 'none',
    marginTop: 5,
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    marginBottom: 20,
    ":focus": {
      border: '1px solid blue'
    },
    ":invalid": {
      border: '1px solid #F43445'
    }
  },
  button: {
    backgroundColor: '#F43445',
    minWidth: 300,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    border: 'none',
    outline: 'none',
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
    boxShadow: '0 0 25px rgba(0, 0, 0, 0.1)',
  }
});

export default Login;