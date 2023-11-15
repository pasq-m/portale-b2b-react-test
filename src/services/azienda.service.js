import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'http://localhost:8080/views/';
const API_URL = 'http://localhost:8080/api/';

class AziendaService {

    getAziende() { 
        return axios.get(API_URL + 'aziende');        
    }

    getAziendaLoggata() { 
        return axios.get(API_URL + 'azienda-loggata');        
    }

    addAziendaFromExcel(json) {
        return axios.post(API_URL + 'add-azienda-from-excel', {
            json
        })
    }

    updateAzienda(id, ragioneSociale, indirizzo, telefono, telefono2, descrizioneTelefoni, fax, email, pec,
                    codiceFiscale, pIva, legaleRappresentante, idFormaGiuridica, idAssociazione, idLocalita, 
                    idCategoria, idAttivitaPrincipale, idAttivitaSecondaria, ruoloForm) {
        return axios.put(API_URL + `update-azienda/${id}/${idLocalita}/${idCategoria}/${idAttivitaPrincipale}`+
                            `/${idAttivitaSecondaria}/${idAssociazione}/${idFormaGiuridica}/${ruoloForm}`, {
            id, ragioneSociale, indirizzo, telefono, telefono2, descrizioneTelefoni, fax, email, pec,
            codiceFiscale, pIva, legaleRappresentante, idFormaGiuridica, idAssociazione, idLocalita,            
            //categoria: {
            //    idCategoria
            //  },

            idCategoria, idAttivitaPrincipale, idAttivitaSecondaria, ruoloForm
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("azienda", JSON.stringify(response.data));
            }
            return response.data;
        });
    }
}

export default new AziendaService();