import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import './styles.less';

const element = (

  <BrowserRouter>
    <App />
  </BrowserRouter>

);

ReactDOM.render(
  element,
  document.getElementById("App")
);