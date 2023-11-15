import React, { Component } from "react";
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import "./home.scss";
//import { utils, read, writeFile } from "xlsx";
import * as xlsx from 'xlsx';
import aziendaService from "../services/azienda.service";

import provinciaService from "../services/provincia.service";


const UploadTest = () => {

    const [provinceList, setProvince] = useState([]);

    const deleteAndReload = (id) => {
      provinciaService.deleteProvincia(id);
      window.location.reload();
    };



    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                //console.log(json);
                aziendaService.addAziendaFromExcel(json);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }



  useEffect (() => {

    /*provinciaService.getProvince()
        .then(response => {
            setProvince(response.data)
        })
        .catch(error => {
          console.error(error);
          });*/
  }, []);
  
  
    return (
      <div className="container">
        <form>
            <label htmlFor="upload">Upload File</label>
            <input
                type="file"
                name="upload"
                id="upload"
                onChange={readUploadFile}
            />
        </form>


      </div>
    );

}

export default UploadTest;
