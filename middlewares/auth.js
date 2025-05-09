import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ error: 'Token no proporcionado o inválido' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Error verificando el token JWT:', err.message);
      return res.status(403).send({ error: 'Token inválido o expirado' });
    }

    req.user = user;
    next();
  });
};

/**
 * Middleware para autorizar roles específicos.
 * Verifica si el usuario tiene el rol requerido para acceder a la ruta.
 * @param {string|string[]} roles - Rol o roles requeridos (por ejemplo, 'admin' o ['admin', 'editor']).
 */
export const authorizeRole = (roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'Usuario no autenticado' });
  }

  const allowedRoles = Array.isArray(roles) ? roles : [roles]; // Convertir a arreglo si es un string
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).send({ error: 'No tienes permiso para acceder a esta ruta' });
  }

  next();
};