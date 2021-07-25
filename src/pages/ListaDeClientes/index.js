import React, { useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AppContext } from "../../App";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
} from "@material-ui/core";


function ListaDeClientes() {
  const { authorized, clientes, setClientes } = useContext(AppContext);
  const classes = useStyles();
  
  let history = useHistory();

  const handleRemoveRow = (rowId) => () => {
    const newClientes = [...clientes];
    const index = clientes.findIndex((clientes) => clientes.id === rowId);
    newClientes.splice(index, 1);
    setClientes(newClientes);
  };

  if (!authorized) {
    return <Redirect to="/login" />;
  }

  return (
    <div style={styles.tabela} className="mt-5">
      <div style={{ height: 400 }} className="tabela mt-2 mb-2">
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Tipo de Cliente</TableCell>
                <TableCell align="center">
                  Nome do Cliente / Nome Fantasia
                </TableCell>
                <TableCell align="center">Sobrenome / Razão Social</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center" component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.tipo}</TableCell>
                  <TableCell align="center">{row.nome}</TableCell>
                  <TableCell align="center">{row.sobrenome}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      className="m-1"
                      onClick={() => {
                        history.push(`/adicionar-clientes/${row.id}`);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      className="m-1"
                      onClick={handleRemoveRow(row.id)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

const styles = {
  tabela: {
    borderRadius: "10px",
    backgroundColor: "#B0C4DE",
    padding: "20px",
  },
};

export default ListaDeClientes;
