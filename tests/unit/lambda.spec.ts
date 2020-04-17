import reposResponses from '../__fixtures__/reposResponses';
import axios from 'axios';
import { handler } from '@/../lambda/getmyrepos';


jest.mock('axios');

(axios.get as jest.Mock).mockImplementation((url) => {
  switch (url) {
    case `https://api.github.com/user/repos?visibility=public&page=1`:
      return Promise.resolve({data : reposResponses.page1});
    case `https://api.github.com/user/repos?visibility=public&page=2`:
      const err: any = {};
      err.response = {
        status: 401,
        data: {
          message: 'Bad Credentials',
        },
      };
      return Promise.reject(err);
  }
});

describe('Lambda function getmyrepos', () => {
  it('renders repositories on call page 1', (done) => {
    const event = {
      queryStringParameters : {
        page : 1,
      },
    };
    handler(event, {}, (e: any, obj: any) => {
      expect(obj.statusCode).toEqual(200);
      expect(obj.body).toEqual(JSON.stringify(reposResponses.page1));
      done();
    });
  });
  it('shows message error if any', (done) => {
    const event = {
      queryStringParameters : {
        page : 2,
      },
    };
    handler(event, {}, (e: any, obj: any) => {
      expect(obj.statusCode).toEqual(401);
      expect(obj.body).toEqual(JSON.stringify({message: 'Bad Credentials'}));
      done();
    });
  });
  it('renders repositories with Access-Control-Allow-Origin * in dev mode', (done) => {
    process.env.NETLIFY_DEV = 'true';
    const event = {
      queryStringParameters : {
        page : 1,
      },
    };
    handler(event, {}, (e: any, obj: any) => {
      expect(obj.headers['Access-Control-Allow-Origin']).toEqual('*');
      done();
    });
  });
});
