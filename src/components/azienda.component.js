import React, { Component } from "react";
import { useEffect, useState } from 'react';
import {Link, json} from "react-router-dom";

import { getFormeGiuridiche } from "../services/formaGiuridica.service"
import formaGiuridicaService from "../services/formaGiuridica.service";
import aziendaService from "../services/azienda.service";
import associazioneService from "../services/associazione.service";
import localitaService from "../services/localita.service";
import categoriaService from "../services/categoria.service";
import authService from "../services/auth.service";
import userService from "../services/user.service";


const Azienda = () => {    

    let currentUserSet = [];

    var stateNestedArray = {
        currentUserGoodArray: {
            ruoli: []
        }
    }

    const [utenteCorrenteOgg, setUtenteCorrenteProva] = useState(stateNestedArray);

    const [aziendaOttenutaDaId, setAziendaOttenutaDaId] = useState([]);
    const [utenteAttuale, setUtenteAttuale] = useState([]);

    const [datiAziendaList, setDatiAzienda] = useState([]);
    const [formaGiuridicaList, setFormaGiuridica] = useState([]);    
    const [formaGiuridicaForm, setFormaGiuridicaForm] = useState("");
    const [associazioneList, setAssociazione] = useState([]);
    const [associazioneForm, setAssociazioneForm] = useState("");
    const [localitaList, setLocalita] = useState([]);
    const [localitaForm, setLocalitaForm] = useState("");
    const [categoriaList, setCategoria] = useState([]);
    const [categoriaForm, setCategoriaForm] = useState("");
    const [attivitaPrincipaleForm, setAttivitaPrincipaleForm] = useState("");
    const [attivitaSecondariaForm, setAttivitaSecondariaForm] = useState("");
    
    //var objects = Object.values(aziendaOttenutaDaId);

    const [img1, setImg1] = useState([]);
    let foto;

    const [backenddata, setBackenddata] = useState([]);

const handleStampa = () => {
  //var arrayForse = Array.from(utenteCorrenteProva)
  //console.log("Objects to map? " + objects);
  /*var objects = Object.values(stateNestedArray2);
    objects.map((value) => {
        console.log("Farà? " + value);
    })*/
    console.log("Utente attuale roba: " + JSON.stringify(utenteAttuale));
}


/*const convertToJsonArray = () => {
    JSONObject songs= json.getJSONObject("songs");
    Iterator x = songs.keys();
    JSONArray jsonArray = new JSONArray();

    while (x.hasNext()){
        String key = (String) x.next();
        jsonArray.put(songs.get(key));
    }
}*/


  useEffect (() => {

    //const currentUser = authService.getCurrentUser();
    //console.log("Current user pretto: " + JSON.stringify(currentUser));
    //currentUserSet = JSON.stringify(currentUser);


    //setUtenteCorrenteProva(authService.getCurrentUser());

    //var utenteAttuale = authService.getCurrentUser();

    setUtenteAttuale(authService.getCurrentUser());

    //console.log("Utente attuale roba: " + JSON.stringify(utenteAttuale.data));

    //Andiamo nel BE e cerchiamo l'oggetto azienda collegato all'ID trovato dell'utente loggato (combaciano sempre).

    //userService.getUtente(authService.getCurrentUser().response.id)
    
    /*userService.getUtente(utenteAttuale.id)
    .then(response => {
        setAziendaOttenutaDaId(response.data);
    })*/

    userService.getAziendaByUtente(utenteAttuale.id)
    .then(response => {
        console.log("By utente: " + JSON.stringify(response.data)); //Ho ottenuto corrett. l'oggetto azienda
        setAziendaOttenutaDaId(response.data);
    })

    //console.log("Currentuserset array?: " + utenteCorrenteProva);

    //utenteCorrenteProva.map(datiii => (
    //    console.log("Currentuserset: " + datiii)
    //));
    //console.log("Currentuserset: " + currentUserSet);
    //console.log("Current set ID: " + currentUserSet.id);
    /*authService.getCurrentUser()
        .then(response => {
            console.log(response.data[0])
            setCurrentUser(response.data)
        });*/

    /*aziendaService.getAziendaLoggata()
        .then(response => {
          setDatiAzienda(response.data)
        });*/

    /*userService.getUtente(currentUserSet.id)
        .then(response => {
            setUtenteCorrenteOgg(response.data)
        });*/

    formaGiuridicaService.getFormeGiuridiche()    //Ricordarsi che se sono functional component classes
        .then(response => {                         //sono funzioni e vanno chiamate con le "()".
            console.log(JSON.stringify(response.data))
            setFormaGiuridica(response.data)
        });

    associazioneService.getAssociazioni()
        .then(response => {
            setAssociazione(response.data)
        });
    
    localitaService.getLocalita()
        .then(response => {
            setLocalita(response.data)
        });
    
    categoriaService.getCategorie()
        .then(response => {
            setCategoria(response.data)
        });     

  }, []);
  
  
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Azienda</h3>
        </header>

        <Link to="/modifica-azienda" state={{ id: aziendaOttenutaDaId.id }} >
          <button type="button" class="btn btn-primary mb-4" >Modifica dati</button>
        </Link>

        <button type="button" onClick={handleStampa}>Stampa console log</button>

        <div className="container">
            <div className="row">
                <div className="col-md-12">

                    {
                        <React.Fragment>

                            <div>
                                <label htmlFor="Id">Id</label>
                                {/*{utenteCorrenteOgg.id}*/}
                                {utenteAttuale.id}
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                {/*{utenteCorrenteOgg.ragioneSociale}*/}
                                {utenteAttuale.email}
                            </div>
                            <div>
                                <label htmlFor="username">Username</label>
                                {utenteAttuale.username}
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                {utenteAttuale.password}
                            </div>
                            <div>
                                <label htmlFor="idAzienda">Ruolo</label>
                                {utenteAttuale.ruoli}
                            </div>

                        </React.Fragment>

                    }

                    {  
                        //datiAziendaList.map(dati => (
                        //objects.map((dati) => (
                        //Object.entries(utenteCorrenteProva).map(dati => (                        
                        <React.Fragment>
                            <div>
                                <label htmlFor="Id">Id</label>
                                {/*{utenteCorrenteOgg.id}*/}
                                {aziendaOttenutaDaId.id}
                            </div>
                            <div>
                                <label htmlFor="ragioneSociale">Ragione Sociale</label>
                                {/*{utenteCorrenteOgg.ragioneSociale}*/}
                                {aziendaOttenutaDaId.ragioneSociale}
                            </div>
                            <div>
                                <label htmlFor="codice">Indirizzo</label>
                                {aziendaOttenutaDaId.indirizzo}
                            </div>
                            <div>
                                <label htmlFor="codice">Telefono</label>
                                {aziendaOttenutaDaId.telefono}
                            </div>
                            <div>
                                <label htmlFor="codice">Telefono Due</label>
                                {aziendaOttenutaDaId.telefono2}
                            </div>
                            <div>
                                <label htmlFor="codice">Descrizione telefoni</label>
                                {aziendaOttenutaDaId.descrizioneTelefoni}
                            </div>
                            <div>
                                <label htmlFor="codice">Fax</label>
                                {aziendaOttenutaDaId.fax}
                            </div>
                            <div>
                                <label htmlFor="codice">Email</label>
                                {aziendaOttenutaDaId.email}
                            </div>
                            <div>
                                <label htmlFor="codice">Pec</label>
                                {aziendaOttenutaDaId.pec}
                            </div>
                            <div>
                                <label htmlFor="codice">Codice fiscale</label>
                                {aziendaOttenutaDaId.codiceFiscale}
                            </div>
                            <div>
                                <label htmlFor="codice">Partita iva</label>
                                {aziendaOttenutaDaId.partitaIva}
                            </div>
                            <div>
                                <label htmlFor="codice">Rappresentante legale</label>
                                {aziendaOttenutaDaId.legaleRappresentante}
                            </div>

                            <div>
                                <label htmlFor="codice">Forma Giuridica</label>
                                {aziendaOttenutaDaId.formaGiuridicaDescrizione}
                            </div>

                            <div>
                                <label htmlFor="codice">Associazione</label>
                                {aziendaOttenutaDaId.associazioneDescrizione}
                            </div>

                            <div>
                                <label htmlFor="codice">Località</label>
                                {aziendaOttenutaDaId.localitaDescrizione}
                            </div>

                            <div>
                                <label htmlFor="codice">Categoria</label>
                                {aziendaOttenutaDaId.categoriaDescrizione}
                            </div>

                            <div>
                                <label htmlFor="codice">Attività Principale</label>
                                {aziendaOttenutaDaId.attivitaPrincipaleDescrizione}
                            </div>

                            <div>
                                <label htmlFor="codice">Attività Secondaria</label>
                                {aziendaOttenutaDaId.attivitaSecondariaDescrizione}
                            </div>

                            {/*<div>
                                <label>
                                Forma giuridica:

                                <select value={formaGiuridicaForm} onChange={e => setFormaGiuridicaForm(e.target.value)}>

                                    {formaGiuridicaList.map( formaGiuridica => (

                                    <option value={formaGiuridica.id}>{formaGiuridica.descrizione}</option>

                                    ))}

                                </select>

                                </label>
                            </div>
                            <div>
                                <label>
                                Associazione:

                                <select value={associazioneForm} onChange={e => setAssociazioneForm(e.target.value)}>

                                    {associazioneList.map( associazione => (

                                    <option value={associazione.id}>{associazione.descrizione}</option>

                                    ))}

                                </select>

                                </label>
                            </div>
                            <div>
                                <label>
                                Località:

                                <select value={localitaForm} onChange={e => setLocalitaForm(e.target.value)}>

                                    {localitaList.map( localita => (

                                    <option value={localita.id}>{localita.descrizione}</option>

                                    ))}

                                </select>

                                </label>
                            </div>
                            <div>
                                <label>
                                Categoria:

                                <select value={categoriaForm} onChange={e => setCategoriaForm(e.target.value)}>

                                    {categoriaList.map( categoria => (

                                    <option value={categoria.id}>{categoria.descrizione}</option>

                                    ))}

                                </select>

                                </label>
                            </div>
                            <div>
                                <label>
                                Attività Principale:

                                <select value={attivitaPrincipaleForm} onChange={e => setAttivitaPrincipaleForm(e.target.value)}>

                                    {categoriaList.map( categoria => (

                                    <option value={categoria.id}>{categoria.descrizione}</option>

                                    ))}

                                </select>

                                </label>
                            </div>
                            <div>
                                <label>
                                Attività Secondaria:

                                <select value={attivitaSecondariaForm} onChange={e => setAttivitaSecondariaForm(e.target.value)}>

                                    {categoriaList.map( categoria => (

                                    <option value={categoria.id}>{categoria.descrizione}</option>

                                    ))}

                                </select>

                                </label>
                            </div>*/}
                        
                        </React.Fragment> 
                        //))
                    }
                </div>        
            </div>
        </div>

      </div>
    );

}

export default Azienda;
