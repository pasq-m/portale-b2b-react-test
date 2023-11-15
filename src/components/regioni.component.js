import React, { Component } from "react";
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import "./home.scss";

import regioneService from "../services/regione.service";


const Regioni = () => {

    const [regioniList, setRegioni] = useState([]);

    const deleteAndReload = (id) => {
      regioneService.deleteRegione(id);
      window.location.reload();
    };

  useEffect (() => {

    regioneService.getRegioni()
        .then(response => {
            setRegioni(response.data)
        })
        .catch(error => {
          console.error(error);
          });
  }, []);
  
  
    return (
      <div className="container">
        <header className="jumbotron">
          {/*<h3>{this.state.content}</h3>*/}
          <h3>Regioni</h3>
        </header>

        <Link to="/add-regione">
          <button type="button" class="btn btn-primary mb-4" >Aggiungi +</button>
        </Link>

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <table className="table">    
                  <thead>
                    <tr>
                      <th>Descrizione</th>
                    </tr>
                  </thead>
                <tbody>
                {  
                  regioniList.map(regione => (                                     
                  <React.Fragment>
                    
                    <tr>
                        <td>{regione.descrizione}</td>
                        <td>{regione.codice}</td>

                        {/*{regione.province.map(provincia => (<p>{provincia.codice}</p>))}*/}

                        <td>
                        
                        {/* Qua va trovato il modo di passare l'id dell'oggetto alla pagina successiva */}
                        {/*<Link to = {{
                              pathname: "/modifica-categoria",
                              state: categoria.id // your data array of objects
                            }} > */}
                          
                        <Link to="/modifica-regione" state={{ id: regione.id }} >

                          <button type="button" class="btn btn-primary mb-4" >Modifica</button>
                        </Link>
                        </td>
                        <td>
                          <button onClick={() => deleteAndReload(regione.id)} type="button" class="btn btn-danger mb-4" >X</button>   {/* Cancelliamo l'oggetto correlato. */}
                        </td>                        
                    </tr>
                  
                  </React.Fragment> 
                    ))                    
                }
                {console.log(regioniList)}

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

export default Regioni;
