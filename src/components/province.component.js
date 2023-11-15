import React, { Component } from "react";
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import "./home.scss";

import provinciaService from "../services/provincia.service";


const Province = () => {

    const [provinceList, setProvince] = useState([]);

    const deleteAndReload = (id) => {
      provinciaService.deleteProvincia(id);
      window.location.reload();
    };

  useEffect (() => {

    provinciaService.getProvince()
        .then(response => {
            setProvince(response.data)
        })
        .catch(error => {
          console.error(error);
          });
  }, []);
  
  
    return (
      <div className="container">
        <header className="jumbotron">
          {/*<h3>{this.state.content}</h3>*/}
          <h3>Province</h3>
        </header>

        <Link to="/add-provincia">
          <button type="button" class="btn btn-primary mb-4" >Aggiungi +</button>
        </Link>

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <table className="table">                
                  <thead>
                    <tr>
                      <th>Codice</th>
                    </tr>
                  </thead>
                <tbody>
                {  
                  provinceList.map(provincia => (                    
                  <React.Fragment>
                    
                    <tr>
                        <td>{provincia.id}</td>
                        <td>{provincia.codice}</td>                        
                        <td>{provincia.regioneCodice}</td>  {/* Costruisce usando un metodo creato in Provincia che va a pescare
                         il codice nella tabella Regioni (relazionata):
                         public String getRegioneCodice(){
                             return regione.getCodice();
                         }
                         
                         Utilizziamo regioneCodice perché così automaticamente credo faccia girare il metodo get sopra, situato sul BE.
                         */}

                        {/*{provincia.regione.map(provincia => (<p>{provincia.descrizione}</p>))}*/}

                        <td>
                        
                        {/* Qua va trovato il modo di passare l'id dell'oggetto alla pagina successiva */}
                        {/*<Link to = {{
                              pathname: "/modifica-categoria",
                              state: categoria.id // your data array of objects
                            }} > */}
                          
                        <Link to="/modifica-provincia" state={{ id: provincia.id }} >

                          <button type="button" class="btn btn-primary mb-4" >Modifica</button>
                        </Link>
                        </td>
                        <td>
                          <button onClick={() => deleteAndReload(provincia.id)} type="button" class="btn btn-danger mb-4" >X</button>   {/* Cancelliamo l'oggetto correlato. */}
                        </td>                        
                    </tr>
                  
                  </React.Fragment> 
                    ))
                }

                {console.log(provinceList)}
                </tbody>
              </table>
            </div>
            {/*<div className="col-md-6">
              <button type="button" class="btn btn-danger mb-4" >X</button>
            </div>*/}

          </div>
        </div>


        {/* Con "index" settato come indice dell'array: viene creato un indice numerato assegnato a
        ciascuno oggetto con il quale verrà replicato di volta in volta l'HTML per mostrare ogni singolo
        oggetto. */}

        {/*<table className="table">                
          <thead>
            <tr>
              <th>Descrizione</th>
            </tr>
          </thead>
          <tbody>
            {  
              categorieList.map((categoria, index) => { 
                  
                return (                  
                    <tr key={index}>
                        <td>{categoria.descrizione}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm mb-4" >X</button>
                        </td>
                    </tr>
                );    
                  
                    
                  })  
            }

          </tbody>  
        </table>*/}




      </div>
    );

}

export default Province;
