// Inyección de dependencias
let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
let jwt = require('jsonwebtoken')
const sqlsp = require('sqlstoreprocedure')

require('events').EventEmitter.defaultMaxListeners = Infinity;
// Inyección de archivos
//
//Configuración
let config = require('./config')
sp = new sqlsp(config.dbconexion.user, config.dbconexion.host, config.dbconexion.dbname, config.dbconexion.pass);
// Inicialización de la aplicación

let Principal = require('./controller/PrincipalController')

var app = express()

// Confituración de nuestra API
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors())
app.set('port', config.puerto)

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', config.domain)
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET')
	res.setHeader('Content-Type', 'application/json')
	next()
});

// Iniciamos las rutas de nuestro servidor/API
let rutas = express.Router()

// Ruta de bienvenida
rutas.get('/', function(req, res) {
	res.send({
		'Mensaje': 'Bienvenido a la API REST!'
	})
})

rutas.route('/Saludar').get(Principal.saludar)

app.use(rutas)

// Inicialización del servicio
app.listen(config.puerto, function() {
	console.log(`Ejecutando en http://localhost:${config.puerto}`)
})

