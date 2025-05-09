class UserDTO {
  /**
   * Constructor del DTO de usuario.
   * @param {Object} user - Objeto del usuario proveniente de la base de datos.
   */
  constructor(user) {
    if (!user._id || !user.email) {
      throw new Error('Datos del usuario incompletos');
    }

    this.id = user._id; // ID del usuario
    this.first_name = user.first_name; // Nombre del usuario
    this.last_name = user.last_name; // Apellido del usuario
    this.email = user.email; // Correo electrónico del usuario
    this.role = user.role; // Rol del usuario
  }

  /**
   * Método estático para transformar una lista de usuarios en una lista de DTOs.
   * @param {Array} users - Lista de usuarios provenientes de la base de datos.
   * @returns {Array} - Lista de objetos UserDTO.
   */
  static fromUserList(users) {
    return users.map(user => new UserDTO(user));
  }
}

export default UserDTO;