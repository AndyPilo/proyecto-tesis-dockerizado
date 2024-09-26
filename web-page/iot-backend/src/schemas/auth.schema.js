import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "El usuario es requerido",
  }),
  email: z
    .string({
      required_error: "Email es requerido",
    })
    .email({
      message: "Correo inválido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(8, {
      message: "La contraseña debe tener como mínimo 8 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "Email invalido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(8, {
      message: "La contraseña debe tener como minimo 8 caracteres",
    }),
});
