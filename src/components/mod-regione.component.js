import React, { Component } from "react";
import { useEffect, useState } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import "./home.scss";

import regioneService from "../services/regione.service";


//const ModCategoria = () => {
function ModRegione(props) {

    const [descrizione, setDescrizione] = useState();
    const [codice, setCodice] = useState();
    let { state } = useLocation();                      //Raccoglie l'ID dell'oggetto cliccato da mod. dalla
    const navigate = useNavigate();                     //pagina categorie (vedi là riga 65).

    //console.log(state.id);

    const required = value => {
        if (!value) {
          return (
            <div className="alert alert-danger" role="alert">
              Questo campo è obbligatorio!
            </div>
          );
        }
      };

    const handleSubmit= (e) => {

        e.preventDefault();
        setDescrizione(e.target.value);
        setCodice(e.target.value);

        regioneService.updateRegione(state.id, descrizione, codice).then(
            () => {              
              //navigate("/regioni");
              //window.location.reload();
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              this.setState({
                loading: false,
                message: resMessage
              });
            }
          );
        
    }
    
    return (
        <div className="col-md-6">
        <div>          
          <Form
            onSubmit={e => { handleSubmit(e) }}
          >
            <div className="form-group">
              <label htmlFor="descrizione">Descrizione</label>
              <Input
                type="text"
                className="form-control"
                name="descrizione"
                value={descrizione}
                onChange={e => setDescrizione(e.target.value)}
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
                onChange={e => setCodice(e.target.value)}
                validations={[required]}
              />
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
        </div>
      </div>
    );

}

export default ModRegione;