/**
 * Middleware para autorizar roles específicos.
 * Verifica si el usuario tiene el rol requerido para acceder a la ruta.
 * @param {string|string[]} roles
 */
export const authorizeRole = (roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'Usuario no autenticado' });
  }

  const allowedRoles = Array.isArray(roles) ? roles : [roles]; 
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).send({ error: 'No tienes permiso para acceder a esta ruta' });
  }

  next();
};