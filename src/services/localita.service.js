import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

class LocalitaService {

    getLocalita() { 
        return axios.get(API_URL + 'localita');        
    }

    addLocalita(descrizione, cap, idProvincia) {
        return axios.post(API_URL + `add-localita/${idProvincia}`, {
            descrizione,
            cap,
            idProvincia
        })
        .then(response => {
            if (response.data.accessToken) {
            localStorage.setItem("localita", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    deleteLocalita(id) {
        return axios.delete(API_URL + `localita/${id}`, {      //IMPORTANTE: bisogna utilizzare i backticks " ` " invece degli apici
            id                                                  //insieme a "$" per passare correttamente un path variable al BE.
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("localita", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    updateLocalita(id, descrizione, cap, idProvincia) {
        return axios.put(API_URL + `update-localita/${id}/${idProvincia}`, {
            id,
            descrizione,
            cap,
            idProvincia
        })
        {/*}.then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("localita", JSON.stringify(response.data));
            }
            return response.data;
        });*/}
    }

}

export default new LocalitaService();