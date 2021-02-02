import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useRouter } from 'next/router';
import { message, Spin } from 'antd';
import Axios from 'axios';

const Register = props => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const makeAPIRequest = async () => {
    try {
      setLoading(true);
      let resp = await Axios({
        method: 'POST',
        url: "http://localhost:3000/api/register",
        data: { first_name: firstName, last_name: lastName, email: email, password: password},
        headers: { 'content-type': 'application/json' }
      });
      let status = resp.data.status;
      let isActive = resp.data.payload['is_active'];
      if (status === 'successful' && isActive) {
        message.success("Success");
        goToLogin();
      }
    } catch(err) {
      console.log(err);
      setLoading(false);
      if (err.response && err.response.data.message) {
        message.error(err.response.data.message);
      } else {
        message.error('Something went wrong');
      }
    }
  }

  const handleRegister = (e) => {
    e.preventDefault();
    if (password === password2) {
      makeAPIRequest();
    } else {
      message.error('Passwords do not match')
    }
  }

  const goToLogin = () => {
    router.push('/login');
  }

  return (
    <Spin spinning={loading} delay={0} size="large">
      <div className={css(styles.mainContainer)}>
        <h1 className={css(styles.header)}>Hi there!</h1>
        <h5 style={{marginBottom: 50}}>Tell me about you.</h5>
        <form style={{flexDirection: 'column', display: 'flex'}} onSubmit={(e) => handleRegister(e)}>
          <h6>First Name</h6>
          <input className={css(styles.inputContainer)} type="text" placeholder="Your first name..." value={firstName} onChange={e => setFirstName(e.target.value)} required />
          <h6>Last Name</h6>
          <input className={css(styles.inputContainer)} type="text" placeholder="Your last name..." value={lastName} onChange={e => setLastName(e.target.value)} required />
          <h6>Email</h6>
          <input className={css(styles.inputContainer)} type="email" placeholder="Your email..." value={email} onChange={e => setEmail(e.target.value)} required />
          <h6>Password</h6>
          <input className={css(styles.inputContainer)} type="password" placeholder="Your password..." value={password} onChange={e => setPassword(e.target.value)} required/>
          <h6>Verify Password</h6>
          <input className={css(styles.inputContainer)} type="password" placeholder="Your password again..." value={password2} onChange={e => setPassword2(e.target.value)} required/>
          <input className={css(styles.button)} type="submit" value="Sign Up" />
        </form>
        <p style={{marginTop: 20, color: '#F43445', cursor: 'pointer'}} onClick={() => goToLogin()}>Have an account?</p>
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

export default Register;