import {Router} from "express";
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import {crearArticulo, curso, mensajes, test} from '../controllers/articulo.js'

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
export default route