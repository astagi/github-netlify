const axios = require('axios');


exports.handler = function(event, context, callback) {
  let responseHeaders = {
    'Content-Type': 'application/json'
  };
  if (process.env.NETLIFY_DEV === 'true') {
    responseHeaders['Access-Control-Allow-Origin'] = '*';
  }
  axios.get(`https://api.github.com/user/repos?visibility=public&page=${event.queryStringParameters.page}`, {
      headers : {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      }
    })
    .then((response)  => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response.data),
        headers: responseHeaders
      });
    })
    .catch((error) => {
      callback(null, {
        statusCode: error.response.status,
        body: JSON.stringify({'message' : error.response.data.message}),
        headers: responseHeaders
      });
    });
}
