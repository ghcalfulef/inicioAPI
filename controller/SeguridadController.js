let jwt = require('jsonwebtoken')
let config = require('../config')

// función de seguridad para ingresar a sitios con token
exports.protegeRuta = function (req, res, next) {
	let token = req.body.token || req.query.token || req.headers['x-api-key'];
	if (token) {
		jwt.verify(token, config.jwt_secreto, function (err, decoded) {
			if (err) {
				console.log(err);
				return res.status(403).json({
					"error": true
				});
			}
			req.decoded = decoded;
			//TODO:console.log(decoded);
			next(); //no error, proceed
		});
	} else {
		return res.status(403).send({
			"error": true
		});
	}
}
//metodo que valida si el token que se le entrega por parametro es valido
exports.validarToken = function (tkn) {
	var salida = false;
	jwt.verify(tkn, config.jwt_secreto, function (err) {
		if (!err) {
			salida = true;
		}
	});
	return salida;
}
//metodo que genera un token con el objeto datos que se le entregue por parametro
exports.generarToken = function (datos, expiracion = config.jwt_expiracion) {
	let token = jwt.sign({
		data: datos
	}, config.jwt_secreto, { expiresIn: expiracion })
	return token;
}
//metodo donde se centralizan las respuestas de los metodos, normalizandola en el mismo objeto de salida
exports.formatoRespuesta = function (exitoP, status, data, mensajeP = true, res) {
	var datos = {
		exito: exitoP,
		mensaje: mensajeP == true ? "Ejecutado correctamente" : mensajeP,
		resultado: data
	}
	return res.status(status).json({ datos });
} 