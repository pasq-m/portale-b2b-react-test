import React, { useState } from "react";
/* CSS */
import "./regTable.css";
/* COMPONENTS */
// import ButtonPen from '../../../../../../../Global/ButtonPen/buttonPen';
import RegModal from "../RegModal/regModal";
//import ProButton from "../../../../../../../Global/ProButton/ProButton";
import ProButton from "../../Global/ProButton/ProButton";
/* MUI MATERIAL ICONS */
import ModeIcon from "@mui/icons-material/Mode";

import regioneService from "../../../services/regione.service";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const RegTable = () => {
  const columns = ["", "Regione", "Codice Regione"];

  const rowsDescr = [
    "ABRUZZO",
    "BASILICATA",
    "CALABRIA",
    "CAMPANIA",
    "EMILIA-ROMAGNA",
    "FRIULI-VENEZIA GIULIA",
    "LAZIO",
    "aaaaaaa",
    "bbbbbbbb",
    "ccccccRow10",
    "dddddd",
    "eeeeee",
    "fffffff",
    "ggggggg",
  ];

  const rowsAbbrRegIta = ["ABR", "BAS", "CAL", "CAM", "EMR", "FVG", "LAZ", "scelta", "scelta", "sceltaRow10", "sceltaRow11", "sceltaRow12", "sceltaRow13", "mancaLa14"];

  const [isModalActive, setIsModalActive] = useState(false);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const [regioniList , setRegioni] = useState([]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //const currentItems = rowsDescr.slice(indexOfFirstItem, indexOfLastItem);
  //const currentAbbrRegIta = rowsAbbrRegIta.slice(indexOfFirstItem, indexOfLastItem);

  const handleClickOpen = () => {
    setIsModalActive(true);
    console.log("modal open");
  };

  const handleClickClose = () => {
    setIsModalActive(false);
    console.log("modal close");
  };

  const getColumnClassName = (columnIndex) => {
    if (columnIndex === 0) {
      return "col-2 px-2 text-center h5 justify-content-center";
    } else if (columnIndex === 1) {
      return "col-8 px-8 text-center h5  justify-content-center";
    } else if (columnIndex === 2) {
      return "col-2 px-2 text-center h5  justify-content-center";
      // } else if (columnIndex === 3) {
      //     return 'col-2 px-2 text-center h5';
      // } else if (columnIndex === 4) {
      //     return 'col-4 px-4 text-center h5';
    } else {
      return "col-12 px-12 text-center h5";
    }
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
    <>
      <div style={{ marginTop: "5rem" }}>
        <table className="table table-bordered w-100">
          <thead>
            <tr className="bold-columns text-center">
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/*{currentItems.map((row, rowIndex) => (*/}
            {regioniList.map((regione, rowIndex)  => (
              <React.Fragment>
              <tr key={rowIndex}>
                <td className={getColumnClassName(0)}>
                  <button type="button" className="btn btn-primary button" onClick={handleClickOpen}>
                    <ModeIcon className="icon" />
                  </button>

                  {/*<Link to="/modifica-regione" state={{ id: regione.id }} >
                    <button type="button" className="btn btn-primary button">
                      <ModeIcon className="icon" />
                    </button>
                  </Link>*/}

                  {/* <ButtonPen onClick={openModal} /> */}
                </td>
                {/*<td className={getColumnClassName(1)}>{row}</td>*/}
                <td className={getColumnClassName(1)}>{regione.descrizione}</td>
                {/*<td className={getColumnClassName(2)}>{currentAbbrRegIta[rowIndex]}</td>*/}
                <td className={getColumnClassName(2)}>{regione.codice}</td>
              </tr>
              
              {/*<div>{isModalActive && <RegModal show={isModalActive} close={handleClickClose} parId={regione.id} />}</div>*/}
              <div>{isModalActive && <RegModal show={isModalActive} close={handleClickClose} parId={regione.id} />}</div>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div style={{ marginBottom: "100px" }} className="d-flex justify-content-center w-100 text-sm page-text-input">
          <div className="widthSmall d-flex justify-content-around align-items-center my-1">
            <ProButton
              text="<<"
              title="Previous Page"
              disabled={currentPage === 1}
              clicked={() => handlePageChange(currentPage - 1)}
            />
            <span className="text-center text-sm">
              Pagina
              <strong className="mx-3 text-sm">
                {currentPage} di {Math.ceil(rowsDescr.length / itemsPerPage)}
              </strong>
              {/* &nbsp; | &nbsp; Go To Page &nbsp;&nbsp;
            <input
              type="number"
              className="goto-page-input"
              defaultValue={currentPage !== 1 && indexOfLastItem >= rowsDescr.length ? currentPage - 1 : currentPage + 1}
            /> */}
            </span>
            <ProButton
              text=">>"
              title="Next Page"
              disabled={indexOfLastItem >= rowsDescr.length}
              clicked={() => handlePageChange(currentPage + 1)}
            />
          </div>
        </div>
          {/*<div>{isModalActive && <RegModal show={isModalActive} close={handleClickClose} />}</div>*/}
        {/*<div>{isModalActive && <RegModal show={isModalActive} close={handleClickClose} parId={regione.id} />}</div>*/}

        {/*<Link to="/modifica-regione" state={{ id: categoria.id }} >
          <button type="button" class="btn btn-primary mb-4" >Modifica</button>
          </Link>*/}

      </div>
    </>
  );
};

export default RegTable;
