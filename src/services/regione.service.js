import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

class RegioneService {

    getRegioni() { 
        return axios.get(API_URL + 'regioni');        
    }

    getRegione(idRegione) { 
        return axios.get(API_URL + `regioni/${idRegione}`, {
            idRegione
        });        
    }

    getProvinceDaRegione(idRegione) { 
        return axios.get(API_URL + `regioni/province/${idRegione}`, {
            idRegione
        });        
    }

    addRegione(descrizione, codice) {
        return axios.post(API_URL + 'add-regione', {
            descrizione,
            codice
        })
        .then(response => {
            if (response.data.accessToken) {
            localStorage.setItem("regione", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    deleteRegione(id) {
        return axios.delete(API_URL + `regioni/${id}`, {      //IMPORTANTE: bisogna utilizzare i backticks " ` " invece degli apici
            id                                                  //insieme a "$" per passare correttamente un path variable al BE.
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("regione", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    updateRegione(id, descrizione, codice) {
        return axios.put(API_URL + `update-regione/${id}`, {
            id,
            descrizione,
            codice
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("regione", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

}

export default new RegioneService();