import React, { Component } from "react";
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import "./home.scss";

import provinciaService from "../services/provincia.service";
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

const AddProvincia = () => {

    const navigate = useNavigate();

    const [regioniList, setRegione] = useState([]);
    const [codice, onChangeCodice] = useState("");
    const [idRegione, onChangeIdRegione] = useState("");
    //const [trueOrFalse, handleAddProvincia] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(!open);
    };

    const handleAddProvincia = (event) => {      
      event.preventDefault();
      provinciaService.addProvincia(codice, idRegione)
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        })    
      };

    const handleStampa = () => {      
      console.log(codice, idRegione);
      };

  useEffect (() => {

    regioneService.getRegioni()
        .then(response => {
            setRegione(response.data)
        })
        .catch(error => {
          console.error(error);
          });

    //onChangeDescrizione();
    //onChangeCap(*Ottenuto dal form*);
    //onChangeIdProvincia(*Ottenuto dal menu a tendina*);    

  }, []);   
  
    return (
        <div className="col-md-6">
          <div>          
            <Form
              onSubmit={handleAddProvincia}              
            >
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

              <div>
                <label>

                  Seleziona regione:

                  {/* Qua associamo con "onChangeIdRegione()" il value regione.id che viene associato ad ogni riga
                  durante il mapping del DOM; in questo modo possiamo passarlo al BE in base alla regione selezionata
                  nel dropdown. */}
                  <select value={idRegione} onChange={e => onChangeIdRegione(e.target.value)}>

                    {regioniList.map( regione => (

                      <option value={regione.id}>{regione.descrizione}</option>

                    ))}

                  </select>

                </label>
              </div>
  
              {/*<div className="dropdown">
                <button onClick={handleOpen}>Dropdown</button>
                {open ? (
                    <ul className="menu">
                        {  
                        provinceList.map(provincia => (                    
                            <React.Fragment>
                                
                                <li>{provincia.descrizione}</li>
                                    {/*<td>{provincia.id}</td>
                                    <td>{provincia.descrizione}</td>                        
                                    <td>{provincia.cap}</td>
                                    <td>{provincia.provinciaCodice}</td>*/}

                                    {/*{provincia.regione.map(provincia => (<p>{provincia.descrizione}</p>))}*/}
                                                 
                            {/*</React.Fragment> 
                            ))
                        }
                    </ul>
                ) : null}
                {open ? <div>Is Open</div> : <div>Is Closed</div>}
              </div>*/}        
              
  
              <div className="col-md-6 mx-auto mt-4">
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"                    
                  >                    
                    <span>Aggiungi</span>
                  </button>
                </div>
  
                {/*{this.state.message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {/*{this.state.message}*/}
                    {/*</div>
                  </div>
                )}*/}
                {/*<CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
                />*/}
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

export default AddProvincia;
