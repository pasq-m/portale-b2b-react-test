import React from "react";
import "./proButton.css"

const ProButton = ({ text, title, customStyleClass = "style-proButton", clicked, disabled = false }) => {
    return (
        <button
            title={title}
            className={"page-btn " + customStyleClass}
            onClick={clicked}
            disabled={disabled} //pages before 1 are disabled
        >
            {text}
        </button>
    )
}
export default ProButton;