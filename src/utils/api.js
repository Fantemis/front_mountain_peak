import axios from 'axios';
import Constants from '../constants';

const headersMultipart = {
  headers: {
    'content-type': 'multipart/form-data'
  }
};

const url = `${Constants.DJANGO_API_URL}`;

class Api {
  headers() {
    return {
      headers: {
        'Content-Type': 'application/json',
      }
    };
  }

  mountainPeaksAll() {
    return axios
      .get(`${url}`, this.headers());
  }

  mountainPeakById(projectId) {
    return axios.get(`${url}/${projectId}`, this.headers());
  }
}

export default new Api();
