import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  Link,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  // Utiliza useForm para manejar el formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, errors: loginErrors } = useAuth();
  const navigated = useNavigate();
  console.log(errors)

  useEffect(() => {
    if (isAuthenticated) {
      navigated("/");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signin(values);
  });

  return (
    <Container maxWidth="xs" style={{ marginTop: "100px" }}>
      {loginErrors.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          {loginErrors.map((error, i) => (
            <Alert severity="error" key={i} style={{ marginBottom: "8px" }}>
              {error}
            </Alert>
          ))}
        </div>
      )}
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={onSubmit}>
        {/* Campo de email */}
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Dirección de Correo"
          name="email"
          autoComplete="email"
          autoFocus
          error={!!errors.email} // Muestra error si hay errores
          helperText={errors.email ? "Email es requerido" : ""}
          {...register("email", { required: "Email es requerido" })}
        />
        {/* Campo de password */}
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          autoComplete="current-password"
          error={!!errors.password} // Muestra error si hay errores
          helperText={errors.password ? "Contraseña es requerida" : ""}
          {...register("password", { required: "Contraseña es requerida" })}
        />
        {/* Botón de submit */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Login
        </Button>
      </form>
      <Typography variant="body2" align="center" style={{ marginTop: "16px" }}>
        ¿No tienes una cuenta?{" "}
        <Link href="/register" variant="body2">
          Regístrate aquí
        </Link>
      </Typography>
    </Container>
  );
}

export default LoginPage;
