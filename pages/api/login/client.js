import Axios from 'axios';
const urls = require('../../../urls');

export default async function handler(req, res) {
  const {
    query: { id, name },
    method,
  } = req;

  if (method === "GET") {
    try {
      let payload  ={
        client_id: process.env.clientId,
        client_secret: process.env.clientSecret
      }
      let response = await Axios({
        method: 'POST',
        url: urls.CLIENT_AUTH_URL,
        data: payload
      });
      res.status(200).json(response.data); 
    } catch (err) {
      res.status(err.response.status).json(err.response.data);
    }
  } else {
    res.status(404).json({"message": "Not found"});
  }
}