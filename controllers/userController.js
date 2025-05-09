import UserDAO from '../dao/UserDAO.js'; 
import { authenticateToken, authorizeRole } from '../middlewares/auth.js';
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserDAO.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    console.error('Error obteniendo los usuarios:', error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ error: 'ID del usuario es requerido' });
    }

    const user = await UserDAO.getUserById(id);

    if (!user) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error('Error obteniendo el usuario:', error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ error: 'ID del usuario es requerido' });
    }

    const deletedUser = await UserDAO.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }

    res.status(200).send({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando el usuario:', error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
};