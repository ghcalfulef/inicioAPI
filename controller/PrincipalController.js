let Seguridad = require('./SeguridadController')

function ejecutaSP (nombre, params, res) {
	try {
		sp.exec(nombre, params).then(result=>{
			Seguridad.formatoRespuesta(1, 200, result.recordset, 1, res);
		}).catch(error=>{
			Log.generarLog(error)
			Seguridad.formatoRespuesta(0, 400, [], error, res);
		})
	} catch (ex) {
		Log.generarLog(ex)
		Seguridad.formatoRespuesta(0, 500, [], ex, res);
	}
}

exports.saludar = function () {
	console.log("hola!");
}