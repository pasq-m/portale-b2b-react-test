import React, { Component } from "react";
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import "./home.scss";

import annuncioService from "../services/annuncio.service";
import regioneService from "../services/regione.service";
import utenteEsternoService from "../services/utenteEsterno.service";


const UtentiEsterni = () => {

    const [utentiEsterniList, setUtentiEsterni] = useState([]);

    const [arrayCostruito, setArrayCostruito] = useState([]);

    const [regioniList, setRegioni] = useState([]);

    const [idRegione, onChangeIdRegione] = useState("")

    const [provinciaDaIdList, setProvinciaDaId] = useState([]);
    const [idProvinciaDaRegione, onChangeidProvinciaDaRegione] = useState([]);
    
    const [img1, setImg1] = useState([]);
    let foto;

    const [backenddata, setBackenddata] = useState([]);

const handleStampa = () => {
  //console.log(annunciList);
}

  useEffect (() => {

    //utenteEsternoService.getUtentiEsterni()                          //IMPORTANTE: serve responseEntity nel
    utenteEsternoService.getUtentiEsterniAnnunci()                          //IMPORTANTE: serve responseEntity nel
        .then(response => {                                          //metodo collegato all'endpoint per ottenere
          setUtentiEsterni(response.data)        
          console.log("Oggettone globalone: " + JSON.stringify(response.data))

          /*Object.keys(response.data).map((utenteEsternoPerArray)=>{
            arrayCostruito.push(utenteEsternoPerArray);            
          });

          setArrayCostruito(arrayCostruito);
          console.log("Array costruito: " + arrayCostruito)*/

        });

        
      
      /*if (!idRegione) {
        console.log("Id Regione: " + idRegione)
        regioneService.getRegioni()
          .then(response => {
            setRegioni(response.data);
          })
      }*/
    
      /*if (idRegione) {  
        console.log("Not equal to null")
        regioneService.getProvinceDaRegione(idRegione)
        .then(response => {
          setProvinciaDaId(response.data)
        })
      }*/  
                
  }, []);
  
  
    return (
      <div className="container">
        <header className="jumbotron">
          {/*<h3>{this.state.content}</h3>*/}
          <h3>Utenti Esterni</h3>
        </header>
        
        <div className="row">
        <div className="col-md-6">

        <table className="table-home">                
            <thead>
              <tr>
                <th>Id</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Ragione Sociale</th>
                <th>Id Annuncio</th>
              </tr>
            </thead>
            <tbody>
          {  

            utentiEsterniList.map(utenteEsterno => (     /*"aziendeList" è l'array, con .map() facciamo girare */
            //arrayCostruito.map(utenteEsterno => (
            //utentiEsterniList.forEach(utenteEsterno => (     /*"aziendeList" è l'array, con .map() facciamo girare */
            <React.Fragment>                 {/* il codice definito dentro map come "parametro" per ogni */}
                                             {/*elemento presente nell'array "aziendeList". */}
                                             {/* Prende l'id di ogni oggetto e ne popola i campi */}
                                             {/* sotto*/}
                
            
              <tr>{/*Commentato per ricordare come si fa instyle dentro React JSX*/}
                  {/*<td style={{paddingRight: 20 + 'px'}}>{azienda.ragioneSociale}</td>*/}
                  {/*<td>{utenteEsterno.id}</td>
                  <td>{utenteEsterno.email}</td>
                  <td>{utenteEsterno.telefono}</td>
                  <td>{utenteEsterno.ragioneSociale}</td>
                  <td>{utenteEsterno.annunci[0].id}</td> */}

                  <td>{utenteEsterno.annuncio.id}</td>
                  <td>{utenteEsterno.dataInteresse}</td>
                  <td>{utenteEsterno.utenteEsterno.email}</td>
                  <td>{utenteEsterno.utenteEsterno.telefono}</td>

                  {/*<img alt="" src={URL.createObjectURL(annuncio.foto)}/>*/}

                  {/*<img alt="" src="data:image/jpeg;bytes,${backenddata}"/>*/}
                  {/*<img alt="" src="data:image/jpeg;base64,/9j/${annuncio.foto}"/>*/}
                  {/*<img alt="" src={URL.createObjectURL(annuncio.foto)}/>*/}
              </tr>
            
            </React.Fragment> 
              ))
          }
            </tbody>
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
        </div>

      </div>
    );

}

export default UtentiEsterni;
