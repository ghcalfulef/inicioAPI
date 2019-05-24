let Seguridad = require('./SeguridadController')
var retornaObjeto = x => ( Object.keys(x.params).length === 0 ? x.body : x.params)
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

exports.saludar = () =>	console.log("hola!")