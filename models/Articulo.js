import mongoose from "mongoose";

//Creamos el Schema
const ArticuloSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        unique: true
    },
    contenido:{
        type: String,
        required: true,
        default: true
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    imagen:{
        type: String,
        default:"default.png"
    }
})


//Creamos el modelo dentro colocamos el nombre de la coleccion y le pasamos el schema, la coleccione ahora en mongo sera Articulo
const Articulo = mongoose.model('Articulo',ArticuloSchema);

//Exportamos el modelo
export default Articulo;