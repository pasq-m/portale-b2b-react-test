import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

class ProvinciaService {

    getProvince() { 
        return axios.get(API_URL + 'province');        
    }

    addProvincia(codice, idRegione) {
        return axios.post(API_URL + `add-provincia/${idRegione}`, {
            codice,
            idRegione
        })
        /*.then(response => {
            if (response.data.accessToken) {
            localStorage.setItem("provincia", JSON.stringify(response.data));
            }
            return response.data;
        });*/
    }

    deleteProvincia(id) {
        return axios.delete(API_URL + `province/${id}`, {      //IMPORTANTE: bisogna utilizzare i backticks " ` " invece degli apici
            id                                                  //insieme a "$" per passare correttamente un path variable al BE.
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("provincia", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    updateProvincia(id, codice, idRegione) {
        return axios.put(API_URL + `update-provincia/${id}/${idRegione}`, {
            id,
            codice,
            idRegione
        })             //Commentato perché gestiamo l'errore direttamente dalla risposta del metodo "handleSubmit()" su mod-provincia
        /*.catch((error) => {
            console.log("Stringify from provincia.service: " + JSON.stringify(error))

        });*/
    }

}

export default new ProvinciaService();