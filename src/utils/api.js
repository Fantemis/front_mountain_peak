import axios from 'axios';
import Constants from '../constants';

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

  updateMountainPeak(id, payload) {
    return axios.put(`${url}update/${id}/`, payload, this.headers());
  }

  createMountainPeak(payload) {
    return axios.post(`${url}create/`, payload, this.headers());
  }

}

export default new Api();
