import {Router} from "express";
import { check,param } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import { crearArticulo, curso, deletearticuloforid, getarticulofindById, listarArticulos, mensajes, test} from '../controllers/articulo.js'

const route = Router();

//Rutas de pruebas
route.get('/probando',test)
route.get('/curso',curso)
route.get('/mensaje',mensajes)

//Ruta util
route.post('/crear',[
check('titulo','El campo titulo es requerido y no debe de estar vacio').not().isEmpty().trim(),
check('titulo','El titulo debe de tener minimo 5 caracteres y maximo 50').isLength({ min: 5,max:50 }),
check('contenido','El campo contendio es requerido y no debe de estar vacio').not().isEmpty().trim(),
validarCampos
],crearArticulo)

//listar todos los articulos
route.get('/listar/:limite?',listarArticulos)


//obterne un resultado por id
route.get('/getarticuloforbyid/:id',[
    check('id','No es un id de Mongo Valido').isMongoId(),
    validarCampos
],getarticulofindById)

//eliminar articulo
route.delete('/deletearticuloforid/:id',[
    check('id','No es un id de Mongo Valido').isMongoId(),
    validarCampos
],deletearticuloforid)
export default route