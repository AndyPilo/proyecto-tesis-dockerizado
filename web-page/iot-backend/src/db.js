import mongoose from "mongoose";

// Configura la URL de conexión con las credenciales de autenticación
const username = encodeURIComponent('root');  // Es importante codificar el usuario y contraseña
const password = encodeURIComponent('example');
const dbname = 'sensorDB';  // Cambia por el nombre de tu base de datos

// Opción si estás usando MongoDB local con autenticación
const mongoURI = `mongodb://${username}:${password}@localhost:27017/${dbname}?authSource=admin`;

export const connectDB = async () => {
    mongoose.connect(mongoURI, {useNewUrlParser: true,useUnifiedTopology: true,})
      .then(() => console.log('Conexión exitosa a MongoDB'))
      .catch((error) => console.error('Error al conectar a MongoDB', error));
}

