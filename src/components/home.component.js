import React, { Component } from "react";
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import "./home.scss";

import annuncioService from "../services/annuncio.service";
import regioneService from "../services/regione.service";


const Home = () => {

    const [annunciList, setAnnunci] = useState([]);
    const [regioniList, setRegioni] = useState([]);
    //const [idRegione, onChangeIdRegione] = useState({
    //  idRegione: 0,
    //  regioneSelezionata: false
    //});

    const [idRegione, onChangeIdRegione] = useState("")

    //const [regioneSelezionata, SetBoolean] = useState(false);
    const [provinciaDaIdList, setProvinciaDaId] = useState([]);
    const [idProvinciaDaRegione, onChangeidProvinciaDaRegione] = useState([]);
    
    const [img1, setImg1] = useState([]);
    let foto;

    const [backenddata, setBackenddata] = useState([]);

const handleStampa = () => {
  console.log(annunciList);
}

  useEffect (() => {

    //Per prova facciamo triggerare il check su annuncio chiuso e in caso sulle notifiche da inviare agli interessati etc
    annuncioService.putAnnuncio()
      .then(response => {
        console.log("Risposta da notifiche annuncio chiuso " + JSON.stringify(response.data));
      });



    annuncioService.getAnnunci()                                     //IMPORTANTE: serve responseEntity nel
        .then(response => {                                          //metodo collegato all'endpoint per ottenere
          setAnnunci(response.data)

          setImg1(response.data[10].foto);
          //setImg1("data:image/jpeg;base64,/9j/" + response.data[10].foto); //***** IMPORTANTE: COSì ACCEDO DIRET. ALLE VARIABILI ******
                                                                      //***** DELL'OGGETTO DELLA RISPOSTA CHE ARRIVA. *****
                                                                      //***** IN QUESTO CASO SO CHE IL NONO ANNUNCIO HA LA FOTO *****
                                                                      //***** E QUINDI NON MI DARà UNDEFINED O NULL.******
                                                                      //***** OTTENIAMO LA VERSIONE BASE64 MENTRE NEL DB è BLOB:*****
                                                                      //***** NON CAPISCO COME SENZA DECODIFICARLA NE Là E NE QUà.*****
        
        //***** QUESTO FUNZIONA PER BECCARE LE FOTO MA è UN PROBLEMA IMPLEMENTARLO *****
        //response.data.map(risposta => (
        //  console.log("Response foto data: " + risposta.foto)
          //imageBytes = risposta.foto.arrayBuffer();
          //blob = new Blob([imageBytes], { type: "image/jpg" })
          //console.log("Image url BLOB: " + imageUrl)
          
          //return imageUrl;

          //const response = await fetch(url);
          //result = response.json()
          // result.data should be as arrayBuffer type
          //let base64String = btoa(String.fromCharCode(...new Uint8Array(result.data.foto)));
          //setBackenddata(base64String);
          
          //setBackenddata(btoa(String.fromCharCode(...new Uint8Array(risposta.foto))))
          //setBackenddata(risposta.foto)
          });

      //if (idRegione !== []) {
      if (!idRegione) {
        console.log("Id Regione: " + idRegione)
        regioneService.getRegioni()
          .then(response => {
            setRegioni(response.data);
          })
      }    
    //if (regioneSelezionata) {
      //if (idRegione !== null) {
      if (idRegione) {  
        console.log("Not equal to null")
        regioneService.getProvinceDaRegione(idRegione)
        .then(response => {
          setProvinciaDaId(response.data)
        })
    }  
                
  }, []);
  
  
    return (
      <div className="container">
        <header className="jumbotron">
          {/*<h3>{this.state.content}</h3>*/}
          <h3>Annunci</h3>
        </header>

        <Link to="/add-annuncio">
          <button type="button" class="btn btn-primary mb-4" >Aggiungi +</button>
        </Link>

        <div>
          <label>

            Seleziona regione:

            {/*<select value={idProvincia} onChange={onChangeIdProvincia}>*/}
            <select value={idRegione} onChange={e => onChangeIdRegione(e.target.value)}>

              {regioniList.map(regione => (

                <option value={regione.id}>{regione.descrizione}</option>

              ))}

            </select>

          </label>
        </div>

        <div>
          <label>

            Seleziona provincia:

            {/*<select value={idProvincia} onChange={onChangeIdProvincia}>*/}
            <select value={idProvinciaDaRegione} onChange={e => onChangeidProvinciaDaRegione(e.target.value)}>

              {provinciaDaIdList.map(provinciaDaRegione => (

                <option value={provinciaDaRegione.id}>{provinciaDaRegione.descrizione}</option>

              ))}

            </select>

          </label>
        </div>

        <table className="table-home">                
            <thead>
              <tr>
                <th>Id</th>
                <th>Titolo</th>
                <th>Descrizione</th>
                <th>Materiale</th>
                <th>Quantità</th>
                <th>Unità di misura</th>
                <th>Foto</th>
                <th>Località</th>                               
                <th>Azienda</th>
              </tr>
            </thead>
          {  
            annunciList.map(annuncio => (     /*"aziendeList" è l'array, con .map() facciamo girare */
            <React.Fragment>                 {/* il codice definito dentro map come "parametro" per ogni */}
                                             {/*elemento presente nell'array "aziendeList". */}
                                             {/* Prende l'id di ogni oggetto e ne popola i campi */}
                                             {/* sotto*/}
                
            <tbody>
              <tr>{/*Commentato per ricordare come si fa instyle dentro React JSX*/}
                  {/*<td style={{paddingRight: 20 + 'px'}}>{azienda.ragioneSociale}</td>*/}
                  <td>{annuncio.id}</td>
                  <td>{annuncio.titolo}</td>
                  <td>{annuncio.descrizione}</td>
                  <td>{annuncio.materiale.descrizione}</td> 
                  <td>{annuncio.quantita}</td>
                  <td>{annuncio.unitaDiMisura.descrizione}</td>
                  {/*<img alt="" src={URL.createObjectURL(annuncio.foto)}/>*/}
                  <img width={250} height={250} alt="" src={annuncio.fotoStringata}/>

                  {/*<img alt="" src="data:image/jpeg;bytes,${backenddata}"/>*/}
                  {/*<img alt="" src="data:image/jpeg;base64,/9j/${annuncio.foto}"/>*/}
                  {/*<img alt="" src={URL.createObjectURL(annuncio.foto)}/>*/}
                                    
                  <td>{annuncio.localita.descrizione}</td>                                   
                  <td>{annuncio.azienda.ragioneSociale}</td>
              </tr>
            </tbody>
            </React.Fragment> 
              ))
          }

          <div>
                <button
                  className="btn btn-primary btn-block"                    
                onClick={handleStampa}
                >                    
                  <span>Stampa</span>
                </button>
            </div>
        </table>
      </div>
    );

}

export default Home;
