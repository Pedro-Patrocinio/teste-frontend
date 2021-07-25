import React, { useState, useEffect, useContext } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { AppContext } from "../../App";
import { Estados } from "../../constants/estados";
import {
  Checkbox,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  InputLabel,
  MenuItem,
  Button,
} from "@material-ui/core";

function AdicionarClientes() {
  const { authorized, clientes, setClientes, novoId, setNovoId } =
    useContext(AppContext);
  const history = useHistory();
  const { id } = useParams("/adicionar-clientes/:id");
  const [tipoCliente, setTipoCliente] = useState("Pessoa Física");
  const [situacao, setSituacao] = useState("Ativo");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [documento, setDocumento] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [horaAbertura, setHoraAbertura] = useState("08:00");
  const [diaAtendimento, setDiaAtendimento] = useState("2017-05-24");
  const [editar, setEditar] = useState(false);
  const [veiculos, setVeiculos] = useState({
    moto: true,
    carro: false,
    caminhao: false,
  });
  const [label, setLabel] = useState({
    nome: "Nome do Cliente",
    sobrenome: "Sobrenome do Cliente",
    documento: "CPF",
  });

  useEffect(() => {
    let index = clientes.findIndex((cliente) => cliente.id == id);
    if (index !== -1) {
      setEditar(true);
      const cliente = clientes[index];
      setTipoCliente(cliente.tipo);
      setSituacao(cliente.situacao);
      setNome(cliente.nome);
      setSobrenome(cliente.sobrenome);
      setDocumento(cliente.documento);
      setEmail(cliente.email);
      setTelefone(cliente.telefone);
      setCep(cliente.cep);
      setRua(cliente.rua);
      setNumero(cliente.numero);
      setCidade(cliente.cidade);
      setEstado(cliente.estado);
      setHoraAbertura(cliente.horaAbertura);
      setDiaAtendimento(cliente.diaAtendimento);
      setVeiculos(cliente.veiculos);
    }
  }, []);

  useEffect(() => {
    if (tipoCliente === "Pessoa Física") {
      setLabel({
        nome: "Nome do Cliente",
        sobrenome: "Sobrenome do Cliente",
        documento: "CPF",
      });
    } else {
      setLabel({
        nome: "Nome Fantasia",
        sobrenome: "Razão Social",
        documento: "CNPJ",
      });
    }
  }, [tipoCliente]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newClientes = clientes;
    let cliente = {
      id: novoId,
      situacao,
      tipo: tipoCliente,
      nome,
      sobrenome,
      documento,
      email,
      telefone,
      cep,
      rua,
      numero,
      cidade,
      estado,
      horaAbertura,
      diaAtendimento,
      veiculos,
    };
    if (editar) {
      let index = clientes.findIndex((cliente) => cliente.id == id);
      cliente.id = newClientes[index].id;
      newClientes[index] = cliente;
      setClientes(newClientes);
    } else {
      setClientes([...clientes, cliente]);
      setNovoId(novoId + 1);
    }

    history.push("/lista-de-clientes");
  };

  const veiculosHandler = (event) => {
    setVeiculos({ ...veiculos, [event.target.name]: event.target.checked });
  };

  if (!authorized) {
    return <Redirect to="/login" />;
  }

  return (
    <div style={styles.div}>
      <form
        style={styles.form}
        className="formulario mt-5 mb-5"
        onSubmit={handleSubmit}
      >
        <FormControl component="fieldset">
          <FormLabel component="legend">Tipo de Cliente</FormLabel>
          <RadioGroup
            variant="outlined"
            margin="normal"
            required
            value={tipoCliente}
            onChange={(e) => setTipoCliente(e.target.value)}
          >
            <FormControlLabel
              value="Pessoa Física"
              control={<Radio />}
              label="Pessoa Física"
              checked={tipoCliente === "Pessoa Física"}
            />
            <FormControlLabel
              value="Pessoa Jurídica"
              control={<Radio />}
              label="Pessoa Jurídica"
              checked={tipoCliente === "Pessoa Jurídica"}
            />
          </RadioGroup>
        </FormControl>

        <br />

        <FormControl component="fieldset" className="mt-3">
          <FormLabel component="legend">Situação do Cliente</FormLabel>
          <RadioGroup
            variant="outlined"
            margin="normal"
            required
            value={situacao}
            onChange={(e) => setSituacao(e.target.value)}
          >
            <FormControlLabel
              value="Ativo"
              control={<Radio />}
              label="Ativo"
              checked={situacao == "Ativo"}
            />
            <FormControlLabel
              value="Inativo"
              control={<Radio />}
              label="Inativo"
              checked={situacao == "Inativo"}
            />
          </RadioGroup>
        </FormControl>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label={label.nome}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          type="text"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label={label.sobrenome}
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          type="text"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label={label.documento}
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          type="text"
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="E-Mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="telefone"
          label="Telefone"
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="cep"
          label="CEP"
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="rua"
          label="Rua"
          type="text"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="numero"
          label="Número"
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="cidade"
          label="Cidade"
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />

        <FormControl>
          <InputLabel id="estadoLabel">Estado</InputLabel>
          <Select
            style={styles.select}
            labelId="estadoLabel"
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            {Estados.sort((a, b) => a.nome.localeCompare(b.nome)).map(
              (estado) => {
                return (
                  <MenuItem key={estado.id} value={estado.sigla}>
                    {estado.nome}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </FormControl>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="horarioAbertura"
          label="Horário de Funcionamento"
          type="time"
          defaultValue="08:00"
          value={horaAbertura}
          onChange={(e) => setHoraAbertura(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="diaAtendimento"
          label="Dia de Atendimento"
          type="date"
          defaultValue="2017-05-24"
          value={diaAtendimento}
          onChange={(e) => setDiaAtendimento(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <div>
          Veiculos Utilizados
          <br />
          <FormControlLabel
            control={
              <Checkbox
                checked={veiculos.moto}
                name="moto"
                id="veiculosUtilizadosMoto"
                onChange={veiculosHandler}
              />
            }
            label="Moto"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={veiculos.carro}
                name="carro"
                id="veiculosUtilizadosCarro"
                onChange={veiculosHandler}
              />
            }
            label="Carro"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={veiculos.caminhao}
                name="caminhao"
                id="veiculosUtilizadosCaminhao"
                onChange={veiculosHandler}
              />
            }
            label="Caminhão"
          />
        </div>

        <div className="mt-4 mb-4">
          <Button type="submit" variant="contained" color="primary" className="ms-1 me-4">
            {editar ? "Editar" : "Cadastrar"}
          </Button>
          {editar ? (
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() => {
                history.push("/lista-de-clientes");
              }}
            >
              Cancelar
            </Button>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
}

const styles = {
  div: {
    display: "flex",
    justifyContent: "center",
  },
  form: {
    border: "1px",
    borderRadius: "10px",
    maxWidth: "780px",
    backgroundColor: "#B0C4DE",
    padding: "20px",
  },
  select: {
    marginBottom: "10px",
    marginLeft: "8px",
    minWidth: "180px",
  },
};

export default AdicionarClientes;
