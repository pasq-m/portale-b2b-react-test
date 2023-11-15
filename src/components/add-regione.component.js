import React, { Component } from "react";
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import "./home.scss";
import regioneService from "../services/regione.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Questo campo è obbligatorio!
      </div>
    );
  }
};

const AddRegione = () => {

    const [descrizione, onChangeDescrizione] = useState("");
    const [codice, onChangeCodice] = useState("");
    
    const handleAddRegione = async (event) => {
      try {
        event.preventDefault();    
        const response = await regioneService.addRegione(descrizione, codice);    //Bisogna aspettare che finisca per poi ottenere la
                                                                                  //Risposta e quindi serve async/await
        console.log("Response headers: " + JSON.stringify(response));
      } catch (error) {
        
        /*Object.entries(error.response.headers).forEach(([key, value]) => console.log(`${key}: ${value}`));

        Object.keys(error.response.headers).map((key, idx) => {
          if (key === "motivo-errore") {
            console.log("Key c'è: " + key);
          }
        });*/
          
        //Controlla che la chiave errore sia giusta
        if (error.response.headers["motivo-errore"]) {
          //Controlla poi che il valore dell'errore sia quello corretto
          if (error.response.headers["motivo-errore"] === "Regione e/o codice regione già presenti") {
              
            //Qua andrà il codice che attiva la procedura di notifica all'admin in FE
            setErroreGiusto(true)

          } else {
            console.log("NON è l'errore giusto!");
          }
        } else {
          console.log("A monte è sbagliato!")
        }

        //console.log("error headers: " + JSON.stringify(error.response.headers["motivo-errore"]));
        //console.log("Parse " + JSON.parse(error.response.headers));
      }
    };

  /*const handleAddRegione = (event) => {

    event.preventDefault(); 
    regioneService.addRegione(descrizione, codice)
      //.then(response => response.json())
      //.then(json => console.log(json));
      .then((response) => {
        console.log(JSON.stringify(response.status), JSON.stringify(response.data));
      });
  }*/

  const [erroreGiusto, setErroreGiusto] = useState(false);

useEffect(() => {

  //renderAuthButton();

})  

    return (
        <div className="col-md-6">
          <div>          
            <Form
              onSubmit={handleAddRegione}              
            >
              <div className="form-group">
                <label htmlFor="descrizione">Descrizione</label>
                <Input
                  type="text"
                  className="form-control"
                  name="descrizione"
                  value={descrizione}
                  onChange={e => onChangeDescrizione(e.target.value)}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="codice">Codice</label>
                <Input
                  type="text"
                  className="form-control"
                  name="codice"
                  value={codice}
                  onChange={e => onChangeCodice(e.target.value)}
                  validations={[required]}
                />
              </div>
          
              <div className="col-md-6 mx-auto mt-4">
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"                    
                  >                    
                    <span>Aggiungi</span>
                  </button>
                </div>
              </div>
              <div className="col-md-6 mx-auto mt-4">
                <div className="form-group">
                  { erroreGiusto &&
                      <div> <button>Prova</button> </div> 
                  }
                </div>
              </div>
              
            </Form>

          </div>
        </div>
      );

}

export default AddRegione;
