import Axios from 'axios';
const urls = require('../../../urls');

export default async function handler(req, res) {
  const {
    query: { id, name },
    method,
  } = req;

  if (method === "POST") {
    try {
      req.body.client_id = process.env.clientId;
      req.body.client_secret = process.env.clientSecret;
      console.log(req.body)
      let response = await Axios({
        method: 'POST',
        url: urls.LOGIN_URL,
        data: req.body
      });
      res.status(200).json(response.data); 
    } catch (err) {
      console.log(err);
      res.status(err.response.status).json(err.response.data);
    }
  } else {
    res.status(404).json({"message": "Not found"});
  }
}