import bcrypt from 'bcryptjs';

export async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}