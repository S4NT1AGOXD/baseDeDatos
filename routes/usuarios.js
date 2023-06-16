const {Router}  = require('express')

const route = Router()

const {usuarioGet, usuarioPost, usuarioPut, usuarioDelete} = require('../controllers/usuario')

route.get('/', usuarioGet)

route.post('/', usuarioPut)

route.put('/', usuarioPost)

route.delete('/',usuarioDelete)

module.exports = route