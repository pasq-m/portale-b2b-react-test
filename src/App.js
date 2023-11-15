import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import Categorie from "./components/categorie.component";
import AddAnnuncio from "./components/add-annuncio.component";
import AddCategoria from "./components/add-categoria.component";
import ModCategoria from "./components/mod-categoria.component";

import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
//import Regioni from "./components/regioni_backup";
import Regioni from "./components/regioni.component";
import AddRegione from "./components/add-regione.component";
import RegModal from "./components/Component/RegModal/regModal";
import ModRegione from "./components/mod-regione.component";
import Province from "./components/province.component";
import ModProvincia from "./components/mod-provincia.component";
import AddProvincia from "./components/add-provincia.component";
import Localita from "./components/localita.component";
import AddLocalita from "./components/add-localita.component";
import ModLocalita from "./components/mod-localita.component";
import Azienda from "./components/azienda.component";
import ModAzienda from "./components/mod-azienda.component";
import UtentiEsterni from "./components/utenti-esterni.component";
import AddUtenteEsterno from "./components/add-utente-esterno.component";
import AziendeList from "./components/aziende-list.component";
import createTokenService from "./services/createToken.service";
import UploadTest from "./components/upload-test.component";
import InteressiVersoAnnunci from "./components/interessi-verso-annunci.component";

//import SidebarTest from "./components/sidebar-test";
//import Carousel from "./components/carousel";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.ruoli.includes("ROLE_MODERATOR"),
        showAdminBoard: user.ruoli.includes("ROLE_ADMIN"),          //Se presente "ROLE_ADMIN" dentro ruoli per l'utente corrente
      });                                                           //setta true showAdminBoard che quindi apparirà (vedere codice sotto
    }                                                               //alla riga 106 circa)

    //Calling the BE for creation of first token - NON FUNZIONA PER ORA
    //createTokenService.createToken();

    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  // ***** PARTE DA RIVEDERE PER ACCEDERE ALLE PAGINE IN BASE AL RUOLO DEL CURRENT USER *****

  /*RoleAccess = ({ roles = [] }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Print current user: " + JSON.stringify(user.ruoli))
    return !roles.length || roles.includes(user?.ruoli)
      ? <Outlet />
      : <Navigate to="/unauthorized" replace />;
  };*/

  /*RoleAccess(roles = []) {
    const user = JSON.parse(localStorage.getItem("user"));
    //console.log("Print current user: " + JSON.stringify(user.ruoli))
    
    console.log(roles);
    
    return !roles.length || roles.includes(user?.ruoli)
      ? <Outlet />                                      //If true
      : <Navigate to="/unauthorized" replace />;        //If false
  };*/

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (      //Gli endpoint su browser vanno impostati qua sul FE (vedi tag Routes sotto)
      
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Polieco
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/azienda"} className="nav-link">
                  Azienda
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/categorie" element={<Categorie />} />
            <Route path="/add-annuncio" element={<AddAnnuncio />} />
            <Route path="/add-categoria" element={<AddCategoria />} />
            <Route path="/modifica-categoria" element={<ModCategoria />} />
            <Route path="/regioni" element={<Regioni />} />
            <Route path="/add-regione" element={<AddRegione />} />
            <Route path="/modifica-regione" element={<ModRegione />} />
            <Route path="/province" element={<Province />} />
            <Route path="/modifica-provincia" element={<ModProvincia />} />
            <Route path="/add-provincia" element={<AddProvincia />} />
            <Route path="/localita" element={<Localita />} />
            <Route path="/modifica-localita" element={<ModLocalita />} />
            <Route path="/add-localita" element={<AddLocalita />} />

            <Route path="/upload-test" element={<UploadTest />} />

            {/* ***** PARTE DA RIVEDERE PER ACCEDERE ALLE PAGINE IN BASE AL RUOLO DEL CURRENT USER ***** */}
            {/*<Route element={<this.RoleAccess roles={["ROLE_ADMIN"]} />}>
              <Route path="/azienda" element={<Azienda />} />
              <Route path="/add-localita" element={<AddLocalita />} />
            </Route>*/}

            <Route path="/azienda" element={<Azienda />} />            
            <Route path="/modifica-azienda" element={<ModAzienda />} />

            <Route path="/aziende-list" element={<AziendeList />} />

            <Route path="/utenti-esterni" element={<UtentiEsterni />} />
            <Route path="/add-utente-esterno" element={<AddUtenteEsterno />} />

            <Route path="/interessi-verso-annunci" element={<InteressiVersoAnnunci />} />

            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
      
    );
  }
}

export default App;
