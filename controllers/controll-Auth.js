const jwt = require('jsonwebtoken');  // Corrected import statement
const bcryptjs = require('bcryptjs'); // Corrected import statement

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

const Usuario = require('./../models/usuario');

module.exports = {
  createUsuario: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const validacion = validarUsuario(name, email, password);

      if (validacion == '') {
        const pass = await bcryptjs.hash(password, 8);
        const nuevoUsuario = new Usuario({ name: name, email: email, password: pass });
        await nuevoUsuario.save();
        return res.status(200).json({ status: true, message: 'Usuario Creado' });
      } else {
        return res.status(400).json({ status: false, message: validacion });
      }
    } catch (error) {
      return res.status(500).json({ status: false, message: [error.message] });
    }
  }
};

const validarUsuario = (name, email, password) => {
  let errors = [];
  if (name === undefined || name.trim() === '') {
    errors.push('El nombre no puede estar vacio');
  }
  if (email === undefined || email.trim() === '') {
    errors.push('El email no puede estar vacio');
  }
  if (password === undefined || password.trim() === '' || password.length < 8) {
    errors.push('La contraseña no puede estar vacia o menor a 8 caracteres');
  }
  return errors;
};
