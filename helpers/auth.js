import jwt from 'jsonwebtoken';
import Axios from 'axios';

export async function getAccessToken() {
  if (localStorage.getItem('accessToken')) {
    let token = localStorage.getItem('accessToken');
    let decoded = jwt.decode(token);
    let timeThreshold = Date.now() + 120000; // Current time plus 2 minutes
    const exp = decoded.exp * 1000;
    if(exp < timeThreshold) {
      // Token expired
      refreshToken();
      token = localStorage.getItem('accessToken');
    }
    return token;
  } else {
    // Fetch client token
    try {
      await fetchClientToken();
      let token = localStorage.getItem('accessToken');
      return token;
    } catch (err) {
      throw err;
    }
  }
}

export function checkTokenType(type) {
  if (localStorage.getItem('accessToken')) {
    let accessToken = localStorage.getItem('accessToken');
    let decoded = jwt.decode(accessToken);
    console.log('decoded', decoded.type);
    return decoded.type === type;
  } else {
    return false;
  }
}

export function getTokenType() {
  if (localStorage.getItem('accessToken')) {
    let accessToken = localStorage.getItem('accessToken');
    let decoded = jwt.decode(accessToken);
    return decoded.type;
  } else {
    return 'client';
  }
}

export async function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  await fetchClientToken();
}

export async function refreshToken() {
  try {
    let accessToken = localStorage.getItem('accessToken');
    let decoded = jwt.decode(accessToken);
    if (decoded.type === 'client') {
      fetchClientToken();
    } else {
      let refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        let response = await Axios({
          url: 'http://localhost:3000/api/login/refresh',
          method: 'POST',
          data: null,
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
        localStorage.setItem('accessToken', response.data.payload.accessToken);
        localStorage.setItem('refreshToken', response.data.payload.refreshToken);
      } else {
        fetchClientToken();
      }
    }
  } catch(err) {
    console.log(err);
    throw err;
  }
}

export async function fetchClientToken() {
  try {
    let response = await Axios({
      url: 'http://localhost:3000/api/login/client',
      method: 'GET',
      data: null
    });
    let accessToken = response.data.payload.accessToken;
    localStorage.setItem('accessToken', accessToken);
  } catch (err) {
    console.log(err);
    throw err;
  }
}