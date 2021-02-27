import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import TodosContextProvider from "./context/TodosContextProvider";

const app = (
  <TodosContextProvider>
    <App />
  </TodosContextProvider>
);

ReactDOM.render(app, document.getElementById("root"));
