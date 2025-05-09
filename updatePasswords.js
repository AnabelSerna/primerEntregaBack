import 'dotenv/config'; // Carga las variables de entorno desde el archivo .env
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './dao/models/User.js'; // Asegúrate de que la ruta sea correcta

const saltRounds = 10;

// Construir la URI de conexión a MongoDB
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const updatePasswords = async () => {
  try {
    // Conexión a MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('Conexión a MongoDB exitosa');

    // Obtener todos los usuarios
    const users = await User.find();
    console.log(`Usuarios encontrados: ${users.length}`);

    // Actualizar contraseñas no encriptadas
    for (const user of users) {
      if (!user.password.startsWith('$2b$')) {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        await user.save();
        console.log(`Contraseña encriptada para el usuario: ${user.email}`);
      } else {
        console.log(`La contraseña del usuario ${user.email} ya está encriptada`);
      }
    }

    console.log('Actualización de contraseñas completada');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error actualizando contraseñas:', error);
    mongoose.disconnect();
  }
};

updatePasswords();