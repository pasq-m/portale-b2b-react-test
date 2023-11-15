import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/auth/';

class UserService {

  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUtente(idUtente) {
    return axios.get(API_URL + `utenti/${idUtente}`, {
        idUtente
    })
    /*.then(response => {
        if (response.data.accessToken) {
        localStorage.setItem("provincia", JSON.stringify(response.data));
        }
        return response.data;
    });*/
  }

  getAziendaByUtente(idUtente) {
    return axios.get(API_URL + `utenti/id-azienda/${idUtente}`, {
        idUtente
    })
    /*.then(response => {
        if (response.data.accessToken) {
        localStorage.setItem("provincia", JSON.stringify(response.data));
        }
        return response.data;
    });*/
  }

  getUtenteByAzienda(idAzienda) {
    return axios.get(API_URL + `utenti/azienda-id/${idAzienda}`, {
        idAzienda
    })
    /*.then(response => {
        if (response.data.accessToken) {
        localStorage.setItem("provincia", JSON.stringify(response.data));
        }
        return response.data;
    });*/
  }


  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
