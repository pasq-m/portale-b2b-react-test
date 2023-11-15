import React, { Component } from "react";
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import "./home.scss";

import localitaService from "../services/localita.service";
import provinciaService from "../services/provincia.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Questo campo è obbligatorio!
      </div>
    );
  }
};

const AddLocalita = () => {

    const [provinceList, setProvincia] = useState([]);
    const [descrizione, onChangeDescrizione] = useState("");
    const [cap, onChangeCap] = useState("");
    const [idProvincia, onChangeIdProvincia] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(!open);
    };

    const handleAddLocalita = (event) => {
      event.preventDefault();  
      localitaService.addLocalita(descrizione, cap, idProvincia);      
      };

      const handleStampa = () => {      
        console.log(descrizione, cap, idProvincia);
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
              onSubmit={handleAddLocalita}              
            >
              <div className="form-group">
                <label htmlFor="descrizione">Descrizione</label>
                <Input
                  type="text"
                  className="form-control"
                  name="descrizione"
                  value={descrizione}
                  //onChange={onChangeDescrizione}
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

                  {/*<select value={idProvincia} onChange={onChangeIdProvincia}>*/}
                  <select value={idProvincia} onChange={e => onChangeIdProvincia(e.target.value)}>

                    {provinceList.map( provincia => (

                      <option value={provincia.id}>{provincia.codice}</option>

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

export default AddLocalita;
