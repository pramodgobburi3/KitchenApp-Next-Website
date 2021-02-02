import Axios from 'axios';
const urls = require('../../urls');

export default async function handler(req, res) {
  const {
    query: { id, name },
    method,
  } = req;

  if (method === "POST") {
    try {
      let response = await Axios({
        method: 'POST',
        url: urls.REGISTER_URL,
        data: req.body
      });
      res.status(200).json(response.data); 
    } catch (err) {
      res.status(err.response.status).json(err.response.data);
    }
  } else {
    res.status(404).json({"message": "Not found"});
  }
}