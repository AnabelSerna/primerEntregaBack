import UserDTO from '../dto/UserDTO.js';

export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: 'Usuario no autenticado' });
    }

    const userDTO = new UserDTO(req.user);
    res.status(200).send(userDTO);
  } catch (error) {
    console.error('Error obteniendo el usuario actual:', error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
};