import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

class CategoriaService {

    getCategorie() { 
        return axios.get(API_URL + 'categorie');        
    }

    addCategoria(descrizione) {
        return axios.post(API_URL + 'add-categoria', {
            descrizione
        })
        .then(response => {
            if (response.data.accessToken) {
            localStorage.setItem("categoria", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    deleteCategoria(id) {
        return axios.delete(API_URL + `categorie/${id}`, {      //IMPORTANTE: bisogna utilizzare i backticks " ` " invece degli apici
            id                                                  //insieme a "$" per passare correttamente un path variable al BE.
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("categoria", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    updateCategoria(id, descrizione) {
        return axios.put(API_URL + `update-categoria/${id}`, {
            id,
            descrizione
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("categoria", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

}

export default new CategoriaService();