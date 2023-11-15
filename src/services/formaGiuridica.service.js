import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

class FormaGiuridicaService {

    //const FormaGiuridicaService = () => {
        getFormeGiuridiche() {
            return axios.get(API_URL + 'forme-giuridiche');            
        };

        addFormaGiuridica(descrizione) {            
                return axios.post(API_URL + 'add-forma-giuridica', {
                    descrizione,
                })
                .then(response => {
                    if (response.data.accessToken) {
                    localStorage.setItem("forma-giuridica", JSON.stringify(response.data));
                    }
                    return response.data;
                });        
        };
}

export default new FormaGiuridicaService();
