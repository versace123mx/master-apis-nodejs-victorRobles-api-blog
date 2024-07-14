import {Router} from "express";
import {curso, mensajes, test} from '../controllers/articulo.js'

const route = Router();

//Rutas de pruebas
route.get('/probando',test)
route.get('/curso',curso)
route.get('/mensaje',mensajes)
export default route