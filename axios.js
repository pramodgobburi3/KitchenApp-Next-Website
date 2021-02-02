import axios from 'axios';
import jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_URL } from './urls';
import { getAccessToken } from './helpers/auth';

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};
let instance = axios.create(defaultOptions);

instance.interceptors.request.use(async function(config) {
  try {
    let token = await getAccessToken();
    if (token != null) {
      config.headers.Authorization = 'Bearer ' + token;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  return config;
});
export default instance;
