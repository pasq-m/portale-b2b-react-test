import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

class AnnuncioService {

    getAnnunci() { 
        return axios.get(API_URL + 'annunci')      
    }

    addAnnuncio(titolo, descrizione, quantita, file, dataDiScadenza, idLocalita, idMateriale, idUnitaDiMisura, currentUserId) {

        console.log("Il file? " + file);

        const dataToSend = {
            'titolo': titolo,
            'descrizione': descrizione,
            'quantita': quantita,
            'dataDiScadenza': dataDiScadenza
          };

        const fotoToSend = {                    //Qua se non lo inserisco in array posso già filtrare quel "{foto: *byte code*}"
            'foto': file                        //che mi scrivi nel db, così avrei direttamente "*byte code*"
        };


        let formData = new FormData();

        console.log("file.name: " + file.name);


        //***** COL BLOB FUNZIONA CON IL BE MA NON SI CAPISCE SE PASSA IL FILE CORRETTAMENTE *****
        //***** "In order to set content-type you have to pass file-like object. It can be done using Blob." *****
        formData.append("data", new Blob([JSON.stringify(dataToSend)],
        {
            type: "application/json"
        }));

        //formData.append("data", JSON.stringify(dataToSend));

        /*formData.append('foto', new Blob([JSON.stringify(fotoToSend)],  //Prob. qua gli passa solo "foto" come una stringa?
        {
            type: "image/jpeg"
        }));*/


        //***** MEGLIO PASSARE DIRETTAMENTE IL FILE INVECE DI INSERIRLO IN UN ARRAY (fotoToSend) *****
        formData.append("foto", new Blob([JSON.stringify(file)]));

        console.log("Foto to send: " + fotoToSend);
        console.log("FORM DATA: " + formData);
   

        // ***** IMPORTANTE: con questo modo, a dispetto delle due richieste diff. su BE, "data" e "foto" per le
        // requestPart, il "data: formdata" viene letto apparentemente allo stesso modo rispetto al metodo "classico"
        //di richiamo di axios sotto (axios.post()) *****
        axios({
            method: 'post',
            url: API_URL + `add-annuncio/${idLocalita}/${idMateriale}/${idUnitaDiMisura}/${currentUserId}`,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
          })
    }

    putAnnuncio() {
        return axios.put(API_URL + 'annunci/check-chiusura-annuncio-ed-invio-notifiche')
    }

}

export default new AnnuncioService();