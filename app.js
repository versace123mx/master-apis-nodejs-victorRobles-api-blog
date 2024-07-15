import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConecction } from "./basedatos/conexion.js";
import route from "./routes/articulo.js"

dotenv.config(); //iniciando variables de entorno
dbConecction(); //conexion base de datos

//Crear servidor de node
const app = express();
const puerto = process.env.PUERTO_EXPRESS || 3000;

//configurar cors
app.use(cors());

//Convertir body a objeto de js, cuando se mandan datos en postman -> body -> row JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}))//para recibir datos desde un formulario si carga de imagenes postman -> body -> x-www-form-urlencoded

//Crear Rutas
app.use("/api",route)
//app.use("/api/mensajes",routeMensaje) aqui creamos otro endpoint
//app.use(route) si no le pasamos la ruta inicial todas se serviran apartir de home

//Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log(`El servidor de espress esta funcionando en el puerto ${puerto}`);
});
