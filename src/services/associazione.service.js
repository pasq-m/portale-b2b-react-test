// import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';



class AssociazioneService {    

    getAssociazioni() {
        return axios.get(API_URL + 'associazioni');        
    };

    addAssociazione(descrizione) {        
        return axios.post(API_URL + 'add-associazione', {
            descrizione,
        })
        .then(response => {
            if (response.data.accessToken) {
            localStorage.setItem("associazione", JSON.stringify(response.data));
            }
            return response.data;
        }); 
    };
}

export default new AssociazioneService();