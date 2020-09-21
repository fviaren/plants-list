const http = require('http');
const fetch = require('node-fetch');

const TREFLE_API_TOKEN = process.env.TREFLE_API_TOKEN;

const requestToken = origin => {
  return fetch(`https://trefle.io/api/auth/claim?token=${TREFLE_API_TOKEN}&origin=${origin}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'}
  })
  .then(res => res.json())
  .then(res => res.token);
}

const server = new http.Server((request, response) => {
  requestToken(request.origin || process.env.ORIGIN)
  .then(token => { response.write(token) })
  .then(() => { response.end() })
  .catch(console.log);
})

server.listen(8080);
