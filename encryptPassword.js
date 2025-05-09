import bcrypt from 'bcrypt';

const saltRounds = 10;

/**
 * Encripta una contraseña en texto plano.
 * @param {string} plainPassword - Contraseña en texto plano.
 * @returns {Promise<string>} - Hash encriptado de la contraseña.
 */
async function encryptPassword(plainPassword) {
  try {
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    console.log('Contraseña encriptada:', hash);
    return hash;
  } catch (err) {
    console.error('Error encriptando la contraseña:', err);
    throw err;
  }
}

// Ejemplo de uso
const plainPassword = 'Joaquin1'; // Contraseña en texto plano
encryptPassword(plainPassword);