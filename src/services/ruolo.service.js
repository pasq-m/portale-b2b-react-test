import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/auth/';

class RuoloService {

  getRuoli() {
    return axios.get(API_URL + 'ruoli');
  }
  
}

export default new RuoloService();
