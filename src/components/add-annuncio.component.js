import React, { Component } from "react";
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import "./home.scss";

import annuncioService from "../services/annuncio.service";
import provinciaService from "../services/provincia.service";
import userService from "../services/user.service";
import authService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Questo campo è obbligatorio!
      </div>
    );
  }
};

const AddAnnuncio = () => {

    const [provinceList, setProvincia] = useState([]);
    const [titolo, onChangeTitolo] = useState("");
    const [descrizione, onChangeDescrizione] = useState("");
    const [quantita, onChangeQuantita] = useState(0);
    //const [dataDiScadenza, onChangeDataDiScadenza] = useState(Date);
    const [idProvincia, onChangeIdProvincia] = useState("");
    //const [file, setFile] = useState(new File());
    const [file, setFile] = useState([]);                   //Va trattato come array di foto invece che singola foto?
    //const [file, setFile] = useState();                       //Proviamo senza array *** NON CAMBIA NULLA


    /*const [idLocalita, setIdLocalita] = useState(0);
    const [idMateriale, setIdMateriale] = useState(0);
    const [idUnitaDiMisura, setIdUnitaDiMisura] = useState(0);*/


    //Variabili temporanee di prova
    /*const idLocalita = 1;
    const idMateriale = 1;
    const idUnitaDiMisura = 1;*/

    //const dataDiScadenza = { dataDiScadenza: "2023/08/31" };
    const dataDiScadenza = { dataDiScadenza: "2023-08-31" };
    const idLocalita = { idLocalita: 1 };
    const idMateriale = { idMateriale: 1 };
    const idUnitaDiMisura = { idUnitaDiMisura: 1 }

    //const variablesData = [titolo, descrizione, quantita, dataDiScadenza.dataDiScadenza,
                             //idLocalita.idLocalita, idMateriale.idMateriale, idUnitaDiMisura.idUnitaDiMisura, currentUser.id];



    const [currentUser, setCurrentUser] = useState();

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(!open);
    };

    const [base64File, setBase64File] = useState();


    // ***** BLOBBONE *****

    /*const user ={
        username: "user123"
      };
      const json = JSON.stringify(user);
      const blob = new Blob([json],{
        type: 'application/json'
      });
      
    const body = new FormData();
      body.append("user" ,blob);    //@RequestBody su BE
      body.append("file" ,photo);   //MultipartFile su BE
      
      axios({
        method: 'post',
        url: '/user/add',
        data: body,
      });*/

    const handleAddAnnuncio = (event) => {

      event.preventDefault();             //Serve ad impedire il reload automatico del form (utile per debug console)
      handleStampa();
      annuncioService.addAnnuncio(titolo, descrizione, quantita, base64File, dataDiScadenza.dataDiScadenza, idLocalita.idLocalita,
                                    idMateriale.idMateriale, idUnitaDiMisura.idUnitaDiMisura, currentUser.id);      
      
      
      /*const formData= new FormData();
      formData.append('data', variablesData);*/
      //Array.from(files).forEach(file=>{
      //    formData.append('foto', file)
      //})
      /*formData.append('foto', file);

      annuncioService.addAnnuncio(formData);*/
  
    };

    /*const submitHandler=async(e)=>{
        e.preventDefault()
        const formData= new FormData();
        formData.append('data', variablesData);
        Array.from(files).forEach(file=>{
            formData.append('foto', file)
        });
    }*/
    
    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
    };
    
    const handleUploadClick = () => {
        if (!file) {
            return;
        }
    }

    const handleStampa = () => {      
      console.log(titolo, descrizione, quantita, base64File, dataDiScadenza.dataDiScadenza, idLocalita.idLocalita, idMateriale.idMateriale, idUnitaDiMisura.idUnitaDiMisura, currentUser.id);
    };


    function getBase64(fileToConvert, onLoadCallback) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function() { resolve(reader.result); };     //Qua restituisce il valore che ci serve
            reader.onerror = reject;
            reader.readAsDataURL(fileToConvert);
        });
    }
    
    //***** IMPORTANTE: così lo salva nel db, però passa da base64 a blob (sempre base64 è ma con caratteri diversi) nel db;
    //***** se riuscissi a riottenerlo in codice blob tale e quale al db la foto verrebbe mostrata (prova effettuata)
    //***** ma a quanto pare per rimandarlo in FE forse dobbiamo riconvertirlo da blob a base64.
    //***** Al massimo poi base64 potremmo riconvertirlo in blob o altro per mostrare l'immagine nel fe?
    

    //***** NON è CHIARO COME FACCIA AD ESSERE CHIAMATA LA FUNZIONE FUORI DALL'USE EFFECT?  *****
    var promise = getBase64(file);   //Il valore restituito va gestito in modo asincrono tramite questa parte di codice
    promise.then(function(result) {  //Altrimenti non possiamo ottenere il codice base64 da collegare ad una variabile   
        //console.log("Base64 async: " + result);
        setBase64File(result);
    });



  useEffect (() => {

    /*provinciaService.getProvince()
        .then(response => {
            setProvincia(response.data)
        })
        .catch(error => {
          console.error(error);
          });*/
    
    setCurrentUser(authService.getCurrentUser())

    /*setIdLocalita(1);
    setIdMateriale(1);
    setIdUnitaDiMisura(1);*/

  }, []);   
  
    return (
        <div className="col-md-6">
          <div>          
            {/*<Form enctype='multipart/form-data'
              onSubmit={handleAddAnnuncio}              
            >*/}
            <Form 
              onSubmit={handleAddAnnuncio}
              > 
              <div className="form-group">
                <label htmlFor="titolo">Titolo</label>
                <Input
                  type="text"
                  className="form-control"
                  name="titolo"
                  value={titolo}
                  onChange={e => onChangeTitolo(e.target.value)}
                  validations={[required]}
                />
              </div>

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
                <label htmlFor="quantita">Quantità</label>
                <Input
                  type="text"
                  className="form-control"
                  name="quantita"
                  value={quantita}
                  onChange={e => onChangeQuantita(e.target.value)}
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
            </Form>

            <div>
                <input type="file" onChange={handleFileChange} />

                <div>{file && `${file.name} - ${file.type}`}</div>

                <button onClick={handleUploadClick}>Upload</button>
            </div>

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

export default AddAnnuncio;
