import 'whatwg-fetch';

class HttpService {
  getSongs = () => {

    var promise = new Promise((resolve, reject) => {

    fetch('http://localhost:3004/songs')
    .then(response => {
      resolve(response.json());
      reject("oh no!");
    });

    return promise

  }
}

export default HttpService;
