import React from 'react'
import { Grid } from 'react-loader-spinner'
import "./spinner.css"

const Spinner = () => {
    return (
        <>
            <p></p>
            <Grid
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                className="custom-spinner"
            />
        </>
    )
}

export default Spinner
