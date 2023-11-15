import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { withRouter } from '../common/with-router';
import CategoriaService from "../services/categoria.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Questo campo è obbligatorio!
      </div>
    );
  }
};

class AddCategoria extends Component {
  constructor(props) {
    super(props);
    this.handleAddCategoria = this.handleAddCategoria.bind(this);
    this.onChangeDescrizione = this.onChangeDescrizione.bind(this);

    this.state = {
      descrizione: ""
    };
  }

  onChangeDescrizione(e) {
    this.setState({
      descrizione: e.target.value
    });
  }

  handleAddCategoria(e) {
    e.preventDefault();    

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      CategoriaService.addCategoria(this.state.descrizione).then(
        () => {
          this.props.router.navigate("/categorie");
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
    }
  }

  render() {
    return (
      <div className="col-md-6">
        <div>          
          <Form
            onSubmit={this.handleAddCategoria}
            ref={c => {
              this.form = c;
            }}
          >
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

export default withRouter(AddCategoria);