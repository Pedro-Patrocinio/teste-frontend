import React, { useContext } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { AppContext } from "../App";
import { Button } from "@material-ui/core";

export default function Menu() {
  const { authorized, setAuthorized } = useContext(AppContext);
  let history = useHistory();
  let isLista = useRouteMatch("/lista-de-clientes");
  let isCadastro = useRouteMatch("/adicionar-clientes");

  const logoff = () => {
    localStorage.clear();
    history.push("/");
    setAuthorized(false);
  };

  return (
    <div style={styles.div}>
      <h3 className="ms-3 me-3">Empresa X</h3>
      {authorized && (
        <div>
          {!isLista && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              className="ms-2 me-2"
              onClick={() => {
                history.push("/lista-de-clientes");
              }}
            >
              Lista de Clientes
            </Button>
          )}
          {!isCadastro && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              className="ms-2 me-2"
              onClick={() => {
                history.push("/adicionar-clientes");
              }}
            >
              Cadastrar Clientes
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ms-2 me-2"
            onClick={() => logoff()}
          >
            Desconectar
          </Button>
        </div>
      )}
    </div>
  );
}

const styles = {
  div: {
    width: "inherit",
    backgroundColor: "#4682B4",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
  },
};
