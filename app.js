import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConecction } from "./basedatos/conexion.js";

dotenv.config(); //iniciando variables de entorno
dbConecction(); //conexion base de datos

//Crear servidor de node
const app = express();
const puerto = process.env.PUERTO_EXPRESS || 3000;

//configurar cors
app.use(cors());

//Convertir body a objeto de js
app.use(express.json());

//Crear Rutas
app.get('/probando',(req,res)=>{
    res.status(200).json({msg:'hola mundo'})
})

//Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log(`El servidor de espress esta funcionando en el puerto ${puerto}`);
});
