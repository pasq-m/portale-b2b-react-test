import React, { Component } from "react";
import { useEffect, useState } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import "./home.scss";

import categoriaService from "../services/categoria.service";
import aziendaService from "../services/azienda.service";
import formaGiuridicaService from "../services/formaGiuridica.service";
import associazioneService from "../services/associazione.service";
import localitaService from "../services/localita.service";
import userService from "../services/user.service";
import ruoloService from "../services/ruolo.service";


function ModAzienda(props) {

    
    const [utenteById, setUtenteById] = useState([]);

    const [utenteByIdAzienda, setUtenteByIdAzienda] = useState([]);
    const [ruoloList, setRuoloList] = useState([]);
    const [ruoloForm, setRuoloForm] = useState();

    const [formaGiuridicaList, setFormaGiuridicaList] = useState([]);
    const [associazioneList, setAssociazioneList] = useState([]);
    const [localitaList, setLocalitaList] = useState([]);
    const [categoriaList, setCategoriaList] = useState([]);
    const [attivitaPrincipaleList, setAttivitaPrincipaleList] = useState([]);
    const [attivitaSecondariaList, setAttivitaSecondariaList] = useState([]);

    const [ragioneSociale, setRagioneSociale] = useState();
    const [indirizzo, setIndirizzo] = useState();
    const [telefono, setTelefono] = useState();
    const [telefono2, setTelefono2] = useState();
    const [descrizioneTelefoni, setDescrizioneTelefoni] = useState();
    const [fax, setFax] = useState();
    const [email, setEmail] = useState();
    const [pec, setPec] = useState();
    const [codiceFiscale, setCodiceFiscale] = useState();
    const [partitaIva, setPartitaIva] = useState();
    const [rappresentanteLegale, setRappresentanteLegale] = useState();
    const [formaGiuridicaFormNoFiltro, setFormaGiuridicaForm] = useState();
    const [associazioneForm, setAssociazioneForm] = useState(0);
    const [idLocalita, setLocalitaForm] = useState();
    const [idCategoriaNoFiltro, setCategoriaForm] = useState();
    const [attivitaPrincipaleForm, setAttivitaPrincipaleForm] = useState();
    const [attivitaSecondariaForm, setAttivitaSecondariaForm] = useState();

    let idCategoria = 0;
    let formaGiuridicaForm = 0;

    let { state } = useLocation();                      //Raccoglie l'ID dell'oggetto cliccato da mod. dalla
    const navigate = useNavigate();                     //pagina categorie (vedi là riga 65).

    const [ruolo, setRuolo] = useState(state.id);

    //BISOGNA PRIMA OTTENERE TUTTO L'OGGETTO UTENTE DALLO STATE.ID CHE RAPPRESENTA SOLO
    //L'ID DELL'AZIENDA CHE STIAMO MODIFICANDO.
    //DOPO POTREMMO OTTENERE IL RUOLO DELL'UTENTE E ALTRO AD OGGETTO COMPLETO OTTENUTO

    var categoriaString;

    console.log("Lo stato è questo: " + state.id);

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

        //console.log(indirizzo, telefono, idCategoria)
        e.preventDefault();

        //categoriaString = idCategoria;

        //idCategoria = parseInt(idCategoriaNoFiltro, 10);
        //formaGiuridicaForm = parseInt(formaGiuridicaFormNoFiltro, 10);

        //setRagioneSociale(e.target.value);

        aziendaService.updateAzienda(state.id, ragioneSociale, indirizzo, telefono, telefono2, descrizioneTelefoni, fax, email, pec,
                                        codiceFiscale, partitaIva, rappresentanteLegale, formaGiuridicaFormNoFiltro, associazioneForm, idLocalita, 
                                        idCategoriaNoFiltro, attivitaPrincipaleForm, attivitaSecondariaForm, ruoloForm)
            .then(
            () => {              
              //navigate("/azienda");
              //window.location.reload();
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              /*this.setState({
                loading: false,
                message: resMessage
              });*/
            }
          );        
    }

    useEffect (() => {

      //Tramite id azienda va a beccare il row dell'utente da cui prenderemo ruolo e altro
        userService.getUtenteByAzienda(state.id)
          .then(response => {
            //setUtenteByIdAzienda(JSON.stringify(response.data))
            setUtenteByIdAzienda(response.data)
            console.log("Stringata: " + JSON.stringify(response.data.ruoli[0].descrizione)); //PERCORSO FUNZIONANTE PER RUOLO
        })

        ruoloService.getRuoli()
          .then(response => {
            setRuoloList(response.data)
        })
          .catch(error => {
            console.error(error);
        });

        /*userService.getAziendaByUtente(state.id)
          .then(response => {
            setUtenteById(response.data)
        })*/

        formaGiuridicaService.getFormeGiuridiche()
          .then(response => {
            setFormaGiuridicaList(response.data)
        })
          .catch(error => {
            console.error(error);
        });
        
        associazioneService.getAssociazioni()
          .then(response => {
            setAssociazioneList(response.data)
        })
          .catch(error => {
            console.error(error);
        });

        localitaService.getLocalita()
          .then(response => {
            setLocalitaList(response.data)
        })
          .catch(error => {
            console.error(error);
        });

        categoriaService.getCategorie()
          .then(response => {
            setCategoriaList(response.data)
            setAttivitaPrincipaleList(response.data)
            setAttivitaSecondariaList(response.data)
        })
          .catch(error => {
            console.error(error);
        });
  
    }, []); 
    
    return (
        <div className="col-md-6">

           {
            <React.Fragment>
              <div>
                <label>Ruolo:</label>
                <div>
                  {/*{utenteByIdAzienda.ruoli[0].descrizione}*/}
                  {utenteByIdAzienda.username && utenteByIdAzienda.ruoli[0].descrizione}   {/* Se metto solo ".ruoli" mi da errore perché rappresenta un oggetto con chiavi; */}
                </div>                        {/* serve invece un array. */}
              </div>
            </React.Fragment>
           }


            {/*{utenteByIdAzienda.map((data, index) => (
              <div key={index}>
                <span>{data.id}</span>
                <span>{data.ragioneSociale}</span>
              </div>
            ))}*/}

            {/*{utenteByIdAzienda.map((input,index) => 
                {
                    //input data here
                    
                    {input.ruoli.map((data,i) => 
                        {
                          <div key={i}>
                          <span>{data.id}</span>
                          <span>{data.ragioneSociale}</span>
                        </div>
                        }
                    )}
                }
              )}*/}

        <div>          
          <Form
            onSubmit={e => { handleSubmit(e) }}
          >
          {/*<div>
            <select value={formaGiuridicaFormNoFiltro} onChange={e => setFormaGiuridicaForm(e.target.value)}>

              {utenteByIdAzienda.map( utente => (

              <option value={utente.id}>{utente.ruoli}</option>

              ))}
            </select>
          </div>*/}

          {/*{
            <React.Fragment>
              <div>
                <label>Ruolo:</label>
                <div>
                  {utenteByIdAzienda}
                </div>
              </div>
            </React.Fragment>
          }*/}

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={utenteByIdAzienda}
                onChange={e => setUtenteByIdAzienda(e.target.value)}
                validations={[required]}
              />
            </div>

            <div>
              {/*<select value={utenteByIdAzienda.username && utenteByIdAzienda.ruoli[0].descrizione} onChange={e => setRuoloForm(e.target.value)}>*/}
              <select value={ruoloForm} onChange={e => setRuoloForm(e.target.value)}>
                {ruoloList.map( ruolo => (

                <option value={ruolo.id}>{ruolo.descrizione}</option>

                ))}
              </select>
            </div>



            <div className="form-group">
              <label htmlFor="ragioneSociale">Ragione Sociale</label>
              <Input
                type="text"
                className="form-control"
                name="ragioneSociale"
                value={ragioneSociale}
                onChange={e => setRagioneSociale(e.target.value)}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="indirizzo">Indirizzo</label>
              <Input
                type="text"
                className="form-control"
                name="indirizzo"
                value={indirizzo}
                onChange={e => setIndirizzo(e.target.value)}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Telefono</label>
              <Input
                type="text"
                className="form-control"
                name="telefono"
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono2">Telefono 2</label>
              <Input
                type="text"
                className="form-control"
                name="telefono2"
                value={telefono2}
                onChange={e => setTelefono2(e.target.value)}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="descrizioneTelefoni">Descrizione Telefoni</label>
              <Input
                type="text"
                className="form-control"
                name="descrizioneTelefoni"
                value={descrizioneTelefoni}
                onChange={e => setDescrizioneTelefoni(e.target.value)}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fax">Fax</label>
              <Input
                type="text"
                className="form-control"
                name="fax"
                value={fax}
                onChange={e => setFax(e.target.value)}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="pec">Pec</label>
              <Input
                type="text"
                className="form-control"
                name="pec"
                value={pec}
                onChange={e => setPec(e.target.value)}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="codiceFiscale">Codice fiscale</label>
              <Input
                type="text"
                className="form-control"
                name="codiceFiscale"
                value={codiceFiscale}
                onChange={e => setCodiceFiscale(e.target.value)}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="partitaIva">Partita Iva</label>
              <Input
                type="text"
                className="form-control"
                name="partitaIva"
                value={partitaIva}
                onChange={e => setPartitaIva(e.target.value)}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="rappresentanteLegale">Rappresentante Legale</label>
              <Input
                type="text"
                className="form-control"
                name="rappresentanteLegale"
                value={rappresentanteLegale}
                onChange={e => setRappresentanteLegale(e.target.value)}
                validations={[required]}
              />
            </div>

            <div>
                <label>
                Forma giuridica:

                <select value={formaGiuridicaFormNoFiltro} onChange={e => setFormaGiuridicaForm(e.target.value)}>

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

                <select value={idLocalita} onChange={e => setLocalitaForm(e.target.value)}>

                    {localitaList.map( localita => (

                    <option value={localita.id}>{localita.descrizione}</option>

                    ))}

                </select>

                </label>
            </div>
            <div>
                <label>
                Categoria:

                <select value={idCategoriaNoFiltro} onChange={e => setCategoriaForm(e.target.value)}>

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

                    {attivitaPrincipaleList.map( categoria => (

                    <option value={categoria.id}>{categoria.descrizione}</option>

                    ))}

                </select>

                </label>
            </div>
            <div>
                <label>
                Attività Secondaria:

                <select value={attivitaSecondariaForm} onChange={e => setAttivitaSecondariaForm(e.target.value)}>

                    {attivitaSecondariaList.map( categoria => (

                    <option value={categoria.id}>{categoria.descrizione}</option>

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
        </div>
      </div>
    );

}

export default ModAzienda;