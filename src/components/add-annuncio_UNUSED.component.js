import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AnnuncioService from "../services/annuncio.service";

import { withRouter } from '../common/with-router';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Questo campo è obbligatorio!
      </div>
    );
  }
};

class AddAnnuncio extends Component {
  constructor(props) {
    super(props);
    this.handleAddAnnuncio = this.handleAddAnnuncio.bind(this);
    this.onChangeTitolo = this.onChangeTitolo.bind(this);
    this.onChangeDescrizione = this.onChangeDescrizione.bind(this);
    this.onChangeQuantita = this.onChangeQuantita.bind(this);

    this.state = {
      titolo: "",
      descrizione: "",
      quantita: ""
    };
  }

  onChangeTitolo(e) {
    this.setState({
      titolo: e.target.value
    });
  }

  onChangeDescrizione(e) {
    this.setState({
      descrizione: e.target.value
    });
  }

  onChangeQuantita(e) {
    this.setState({
      quantita: e.target.value
    });
  }

  handleAddAnnuncio(e) {
    e.preventDefault();    

    //this.setState({
      //message: "",
      //loading: true
    //});

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {       //Qua andiamo a spedire i dati del form nel BE
      AnnuncioService.addAnnuncio(this.state.titolo, this.state.descrizione, this.state.quantita).then(
        () => {
          this.props.router.navigate("/home");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } //else {
      //this.setState({
        //loading: false
      //});
    //}
  }

  render() {
    return (
      <div className="col-md-6">
        <div>          
          <Form
            onSubmit={this.handleAddAnnuncio}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="titolo">Titolo</label>
              <Input
                type="text"
                className="form-control"
                name="titolo"
                value={this.state.titolo}
                onChange={this.onChangeTitolo}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="descrizione">Descrizione</label>
              <Input
                type="text"
                className="form-control"
                name="descrizione"
                value={this.state.descrizione}
                onChange={this.onChangeDescrizione}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantita">Quantità</label>
              <Input
                type="text"
                className="form-control"
                name="quantita"
                value={this.state.quantita}
                onChange={this.onChangeQuantita}
                validations={[required]}
              />
            </div>
            <div className="col-md-6 mx-auto mt-4">
              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Aggiungi</span>
                </button>
              </div>

              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(AddAnnuncio);