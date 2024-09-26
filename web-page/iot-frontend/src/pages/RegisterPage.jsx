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

function RegisterPage() {
  // Utiliza useForm para manejar el formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { sigup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigated = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigated("/");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    sigup(values);
  });

  return (
    <Container maxWidth="xs" style={{ marginTop: "100px" }}>
      {registerErrors.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          {registerErrors.map((error, i) => (
            <Alert severity="error" key={i} style={{ marginBottom: "8px" }}>
              {error}
            </Alert>
          ))}
        </div>
      )}
      <Typography variant="h3" align="center" gutterBottom>
        Registrarse
      </Typography>
      <form onSubmit={onSubmit}>
        {/* Campo de username */}
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="username"
          label="Nombre de Usuario"
          name="username"
          autoComplete="username"
          autoFocus
          error={!!errors.username} // Muestra error si hay errores
          helperText={errors.username ? "Usuario es requerido" : ""}
          {...register("username", { required: "Usuario es requerido" })}
        />
        {/* Campo de email */}
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Dirección email"
          name="email"
          autoComplete="email"
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
          {...register("email", {
            required: "Email es requerido",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Expresión regular para validar el email
              message: "Formato de email inválido", // Mensaje si el email no es válido
            },
          })}
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
          Registrarse
        </Button>
      </form>
      <Typography variant="body2" align="center" style={{ marginTop: "16px" }}>
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" variant="body2">
          Inicia sesión aquí
        </Link>
      </Typography>
    </Container>
  );
}

export default RegisterPage;
