import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Menu from "./components/Menu";
import { clientesCadastrados } from "./constants/clientesCadastrados";

export const AppContext = React.createContext();

function App(props) {
  let history = useHistory();
  const [authorized, setAuthorized] = useState(false);
  const [clientes, setClientes] = useState(clientesCadastrados);
  const [novoId, setNovoId] = useState(clientes.length + 1);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setAuthorized(true);
      history.push("/lista-de-clientes");
    } else {
      setAuthorized(false);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        authorized,
        setAuthorized,
        clientes,
        setClientes,
        novoId,
        setNovoId,
      }}
    >
      <div style={styles.app}>
        <div style={styles.body}>
          <div>
            <Menu />
            {props.children}
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

const styles = {
  app: {
    display: "flex",
    justifyContent: "center",
  },
};

export default App;
