import React, { Component } from "react";
import { useEffect, useState } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import "./home.scss";

import categoriaService from "../services/categoria.service";


//const ModCategoria = () => {
function ModCategoria(props) {

    const [descrizione, setDescrizione] = useState();
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

        setDescrizione(e.target.value);

        categoriaService.updateCategoria(state.id, descrizione).then(
            () => {              
              navigate("/categorie");
              window.location.reload();
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

export default ModCategoria;