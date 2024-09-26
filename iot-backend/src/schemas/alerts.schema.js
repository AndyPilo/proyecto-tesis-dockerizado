export const alertSchema = z.object({
  type: z.string({
    required_error: "El usuario es requerido",
  }),
  message: z
    .string({
      required_error: "Email es requerido",
    })
    .email({
      message: "Correo inválido",
    }),
  humidity: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(8, {
      message: "La contraseña debe tener como mínimo 8 caracteres",
    }),
  temperature: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(8, {
      message: "La contraseña debe tener como mínimo 8 caracteres",
    }),
  date: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(8, {
      message: "La contraseña debe tener como mínimo 8 caracteres",
    }),
});
