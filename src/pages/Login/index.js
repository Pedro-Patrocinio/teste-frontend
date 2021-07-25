import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import { useHistory } from "react-router-dom";
import { logins } from "../../constants/logins";
import { Container, Button, TextField, Typography } from "@material-ui/core";

function Login() {
  const { setAuthorized } = useContext(AppContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const randomLetters = function () {
    return Math.random().toString(36).substr(2);
  };
  const generateToken = function () {
    return randomLetters() + randomLetters();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      logins.find((login) => login.email === email && login.senha === senha)
    ) {
      localStorage.setItem("token", generateToken());
      setAuthorized(true);
      history.push("/lista-de-clientes");
    } else {
      alert("Login ou senha inválidos");
      setSenha("");
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className="mt-3 mt-md-5">
          <div className="text-center">
            <Typography
              className="mt-3 font-weight-normal"
              component="h1"
              variant="h6"
            >
              Realize o login antes de proceder
            </Typography>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="senha"
              label="Senha"
              name="senha"
              type="password"
              onChange={(e) => setSenha(e.target.value)}
              value={senha}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              size="large"
              className="mb-3 mb-md-4 mt-4"
            >
              Entrar
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default Login;
