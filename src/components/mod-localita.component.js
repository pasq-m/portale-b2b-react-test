import React, { Component } from "react";
import { useEffect, useState } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import "./home.scss";

import provinciaService from "../services/provincia.service";
import localitaService from "../services/localita.service";

function ModLocalita(props) {

    const [provinceList, setProvincia] = useState([]);
    const [descrizione, onChangeDescrizione] = useState("");
    const [cap, onChangeCap] = useState("");
    const [idProvincia, onChangeIdProvincia] = useState("");
    const [okStatus, setOkStatus] = useState([]);
    const [errorStatus, setErrorStatus] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    let { state } = useLocation();                      //Raccoglie l'ID dell'oggetto cliccato da mod. dalla
                                                        //pagina GET corrispondente (da province.component).
    const navigate = useNavigate();

    const required = value => {
        if (!value) {
          return (
            <div className="alert alert-danger" role="alert">
              Questo campo è obbligatorio!
            </div>
          );
        }
      };

    const handleSubmit = (event) => {

      event.preventDefault();             //Serve ad impedire il reload automatico del form (utile per debug console)
      
      localitaService.updateLocalita(state.id, descrizione, cap, idProvincia).then(
        response => {
          //setOkStatus(response.data)
          //console.log("Good response: " + response.data)
          //navigate("/province");
          //window.location.reload();          
        })
        .catch(error => {
          console.error(error);
          console.log("Error response: " + error.response.status)   //Prende il codice di errore e basta - 412 significa
          setErrorStatus(error.response.status)                     //precondition failed (impostato da me sul BE) e quindi
                                                                    //esiste già il codice che stiamo cercando di inserire.
          
          if (error.response.status === 412) {                      // *** DA IMPLEMENTARE POPUP ***
            console.log("Nome località già presente!");                    //Codice con cui triggeriamo l'apertura dell'alert 
            setIsOpen(true);                                        //per avvertire che il codice inserito è già presente
          }       
        });                                                       
    }

    const handleStampa = () => {      
      console.log(state.id, descrizione, idProvincia);
      };

    useEffect (() => {

        provinciaService.getProvince()
          .then(response => {
              setProvincia(response.data)
          })
          .catch(error => {
            console.error(error);
            });      
  
    }, []); 
    
    return (
        <div className="col-md-6">
        <div>          
          <Form
            //onSubmit={event => { handleSubmit(event) }}
            onSubmit = { handleSubmit }
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
                <label htmlFor="cap">Cap</label>
                <Input
                  type="text"
                  className="form-control"
                  name="cap"
                  value={cap}
                  //onChange={onChangeCap}
                  onChange={e => onChangeCap(e.target.value)}
                  validations={[required]}
                />
              </div>

            <div>
                <label>

                  Seleziona provincia:

                  {/* Qua associamo con "onChangeIdRegione()" il value regione.id che viene associato ad ogni riga
                  durante il mapping del DOM; in questo modo possiamo passarlo al BE in base alla regione selezionata
                  nel dropdown. */}
                  <select value={idProvincia} onChange={e => onChangeIdProvincia(e.target.value)}>

                    {provinceList.map( provincia => (

                      <option value={provincia.id}>{provincia.codice}</option>

                    ))}

                  </select>

                </label>
            </div>

            <div className="col-md-6 mx-auto mt-4">
              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                >                  
                  <span>Modifica</span>
                </button>
              </div> 

            </div>
          </Form>

          <div>
                <button
                  className="btn btn-primary btn-block"                    
                  onClick={handleStampa}
                >                    
                  <span>Stampa</span>
                </button>
            </div>

        </div>
      </div>
    );

}

export default ModLocalita;