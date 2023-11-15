import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { CookiesProvider } from 'react-cookie';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    {/*<CookiesProvider>*/} {/* Serviva per far girare CSRF tra BE e FE ma non andava altro */}
      <App/>
    {/*</CookiesProvider>*/}
  </BrowserRouter>
);

serviceWorker.unregister();
