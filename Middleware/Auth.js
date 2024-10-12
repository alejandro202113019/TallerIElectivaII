const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verificar = (req, res, next) => {
    let token = req.header('x-access-token') || req.header('authorization');

    if (!token) {
        return res.status(401).json({ status: false, errors: ['No autorizado'] });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({ status: false, errors: ['Token NO válido'] });
        } else {
            req.decoded = decoded;
            next();
        }
    });
};

module.exports = { verificar };