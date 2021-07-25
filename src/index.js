import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./pages/Login";
import ListaDeClientes from "./pages/ListaDeClientes";
import AdicionarClientes from "./pages/AdicionarClientes";

ReactDOM.render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/adicionar-clientes/:id?" component={AdicionarClientes} />
        <Route
          exact
          path="/lista-de-clientes"
          component={() => <ListaDeClientes authorized={true} />}
        />
      </Switch>
    </App>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
