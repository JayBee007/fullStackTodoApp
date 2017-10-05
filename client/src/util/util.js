import axios from 'axios';

const token = localStorage.getItem('x-auth');

const client = (token = null) => {

  const defaultOptions = {
    headers: {
      'x-auth': token
    }
  };

  return {
    get: (url, options={}) => axios.get(url, {...defaultOptions, ...options}),

    post: (url,data,options={}) => axios.post(url,data, {...defaultOptions, ...options}),

    patch: (url,data,options={}) => axios.patch(url,data, {...defaultOptions, ...options}),

    delete: (url,options={}) => axios.delete(url, {...defaultOptions, ...options})
  };

};

const request = client(token);

export default request;
