import React from "react";
import "./pagination.css";
import ProButton from "../ProButton/ProButton";

const Pagination = ({ nextPage, previousPage, canPreviousPage, canNextPage, pageOptions, pageIndex, gotoPage }) => {
  return (
    <>
      <div className="d-flex justify-content-center w-100 text-sm page-text-input">
        <div className="widthSmall d-flex justify-content-around align-items-center my-1">
          <ProButton text="<<" title="Previous Page" clicked={previousPage} disabled={!canPreviousPage} />
          <span className="text-center text-sm">
            Page
            <strong className="mx-3 text-sm">
              {pageIndex + 1} of {pageOptions.length}
            </strong>
            &nbsp; | &nbsp; Go To Page &nbsp;&nbsp;
            <input
              type="number"
              className=" goto-page-input"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(pageNumber);
              }}
            />
          </span>
          <ProButton text=">>" title="Next Page" clicked={nextPage} disabled={!canNextPage} />
        </div>
      </div>
    </>
  );
};

export default Pagination;
