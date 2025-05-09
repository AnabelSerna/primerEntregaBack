import mongoose from 'mongoose';
import User from './models/User.js';

class UserDAO {
  /**
   * Crea un nuevo usuario.
   * @param {Object} userData - Datos del usuario.
   * @returns {Promise<Object>} - Usuario creado.
   */
  static async createUser(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      console.error('Error creando usuario:', error.message);
      throw new Error('No se pudo crear el usuario');
    }
  }

  /**
   * Obtiene un usuario por su ID.
   * @param {string} id - ID del usuario.
   * @returns {Promise<Object|null>} - Usuario encontrado o null si no existe.
   */
  static async findUserById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID de usuario inválido');
      }

      return await User.findById(id);
    } catch (error) {
      console.error('Error obteniendo usuario por ID:', error.message);
      throw new Error('No se pudo obtener el usuario');
    }
  }

  /**
   * Obtiene un usuario por su correo electrónico.
   * @param {string} email - Correo electrónico del usuario.
   * @returns {Promise<Object|null>} - Usuario encontrado o null si no existe.
   */
  static async findUserByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      console.error('Error obteniendo usuario por correo electrónico:', error.message);
      throw new Error('No se pudo obtener el usuario');
    }
  }

  /**
   * Obtiene todos los usuarios.
   * @returns {Promise<Array>} - Lista de usuarios.
   */
  static async findAllUsers() {
    try {
      return await User.find();
    } catch (error) {
      console.error('Error obteniendo todos los usuarios:', error.message);
      throw new Error('No se pudo obtener la lista de usuarios');
    }
  }

  /**
   * Actualiza un usuario por su ID.
   * @param {string} id - ID del usuario a actualizar.
   * @param {Object} updateData - Datos para actualizar el usuario.
   * @returns {Promise<Object|null>} - Usuario actualizado o null si no existe.
   */
  static async updateUser(id, updateData) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID de usuario inválido');
      }

      return await User.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      console.error('Error actualizando usuario:', error.message);
      throw new Error('No se pudo actualizar el usuario');
    }
  }

  /**
   * Elimina un usuario por su ID.
   * @param {string} id - ID del usuario a eliminar.
   * @returns {Promise<Object|null>} - Usuario eliminado o null si no existe.
   */
  static async deleteUserById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID de usuario inválido');
      }

      return await User.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error eliminando usuario:', error.message);
      throw new Error('No se pudo eliminar el usuario');
    }
  }
}

export default UserDAO;