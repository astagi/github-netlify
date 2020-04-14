const axios = require('axios');


exports.handler = function(event, context, callback) {
  axios.get(
    `https://api.github.com/user/repos?visibility=public&page=${event.queryStringParameters.page}`,
    {
      headers : {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      }
    }
  ).then((response)  => {
    let headers = {
      'Content-Type': 'application/json'
    };
    if (process.env.NETLIFY_DEV === 'true') {
      headers['Access-Control-Allow-Origin'] = '*';
    }
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: headers
    });
  });
}
