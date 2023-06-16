//Importar paquetes requeridos de Node
const {response} = require('express')

//Importación de los modelos
const Usuario = require('../models/usuario')

//Consultar
const usuarioGet = async(req, res = response) =>{
    const {nombre} = req.query //Desestructuración

    //Consultar todos los usuarios
    const usuarios = await Usuario.find()
    /*.find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
*/
    res.json({
        usuarios
    })   
}

//Registrar
const usuarioPost = async (req, res = response) => {
    const body = req.body;
    let mensaje = '';
  
    try {
      const usuario = new Usuario(body);
      await usuario.save();
      mensaje = 'El registro se realizó exitosamente';
  
      res.json({
        ok: true,
        mensaje,
        usuario
      });
    } catch (error) {
      console.log(error);
      if (error.name === 'ValidationError') {
        res.status(400).json({
          ok: false,
          mensaje: 'Error al crear usuario',
          errores: Object.values(error.errors).map(val => val.message)
        });
      } else {
        res.status(500).json({
          ok: false,
          mensaje: 'Error al crear usuario',
          error
        });
      }
    }
  };
  

//Modificar
const usuarioPut = async(req, res = response) => {

    const {nombre, password, rol, estado} = req.body
    let mensaje = ''

    try{
        const usuario = await Usuario.findOneAndUpdate({nombre: nombre},{password:password, rol:rol, estado:estado})
        mensaje = 'La modificación se efectuó exitosamente'
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la modificación.'
    }

    res.json({
        msg: mensaje
    })
}

  
//Modificar
const usuarioDelete = async(req, res = response) => {

    const {_id} = req.body
    let mensaje = ''

    try{
        const usuario = await Usuario.deleteOne({_id: _id})
        mensaje = 'La eliminiación se efectuó exitosamente.'
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la eliminación.'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}