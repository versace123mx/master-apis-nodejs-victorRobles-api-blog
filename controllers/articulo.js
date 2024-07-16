import fs from 'fs'
import Articulo from "../models/Articulo.js";
import { subirArchivo } from '../helper/subir-archivo.js'

const test = (req, res) => {
    res.status(200).json({ msg: "Hola Maria Jose mi amor" });
};

const curso = (req, res) => {
    res.status(200).json({ msg: "Esta es la ruta de curso" });
};

const mensajes = (req, res) => {
    res.status(200).json({ msg: "Esta es la ruta de curso" });
};

const crearArticulo = async (req, res) => {
  //recoger los parametros por post
    const { titulo, contenido } = req.body;

  //crear el objeto y asignarle los datos que guardara
    const articulo = new Articulo({ titulo, contenido });

  //asignar valores a objeto manual
  //articulo.titulo = titulo
  //articulo.contenido = contenido

    try {
        //guardar el articulo en la db
        await articulo.save();

        //devolver resultado
        res.status(200).json({ msg: "accion de guardar", articulo });
    } catch (error) {
        res.status(400).json({ msg: "Error al guardar en base de datos", error });
    }
};

const listarArticulos = async (req,res) => {
    let limit = ''
    if(req.query.limite && !isNaN(Number(req.query.limite))){
        limit = Number(req.query.limite)
    }
    try {
        const consulta = await Articulo.find().sort({fecha:-1}).limit(limit)
        const numResult = consulta.length
        res.status(200).json({numResult,result: consulta})
    } catch (error) {
        res.status(400).json({msg: `Error en la consulta: ${error}`})
    }
}

const getarticulofindById = async (req,res) => {
    //recoger id por url
    const { id } = req.params

    //buscararticulo
    try {
        const result = await Articulo.findById(id)
        if(result){
            return res.status(200).json({result})
        }
        res.status(400).json({msg: "Resultado no encontrado"})
    } catch (error) {
        res.status(401).json({msg: `Error valida el id o contacta con el admin ${error}`})
    }
}

const deletearticuloforid = async (req, res) => {
    //recoger id por url
    const { id } = req.params

    //buscararticulo
    try {
        const result = await Articulo.findById(id)
        if(result){
            await Articulo.findOneAndDelete({_id:result._id})
            return res.status(200).json({msg: `El registro ${result._id} ha sido eliminado correctamente`})
        }
        res.status(400).json({msg: "Resultado no encontrado"})
    } catch (error) {
        res.status(401).json({msg: `Error valida el id o contacta con el admin ${error}`})
    }
}

const editar = async (req,res) =>{
    //recogemos el id
    const {id} = req.params

    //buscar si existe ese registro
    const result = await Articulo.findById(id)
    if(!result){
        return res.status(400).json({msg: "Resultado no encontrado"})
    }

    //recoger datos del body
    const parametros = req.body
    
    try {
        //realizamos la actualizacion
        const resp = await Articulo.findOneAndUpdate({_id:result._id},parametros, {new: true})
        return res.status(200)
                    .json({msg: `El registro ${result._id} ha sido actualizado correctamente`,resp})
    } catch (error) {
        res.status(401).json({msg: `Error valida el id o contacta con el admin ${error}`})
    }    

}

const cargarArchivo = async (req, res) => {

    try {
        const nombre = await subirArchivo(req.files, undefined, 'pecoras')
        res.json({ nombre })
    } catch (error) {
        res.status(400).json(error)
    }
}

const actualizarImagen = async (req, res) => {
    const { id } = req.params

    const modelo = await Articulo.findById(id)
        if (!modelo) {
            return res.status(400).json({ msg: `No existe un usuario con el id ${id}` })
        }

    //verificamos si tiene el campo imagen, si tiene el campo imagen es por que ya hay una imagen previa
    if (modelo.imagen) {
        const pathImage = './uploads/' + modelo.imagen //creamos la ruta de la imagen previa
        //verificamos si existe la imagen
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage)//en caso de que la imagen previa exista procedemos a eliminarla
        }
    }

    const nombre = await subirArchivo(req.files, undefined)
    modelo.imagen = nombre
    await modelo.save({ new: true })
    res.json({ modelo })

}
const mostrarImagen = async (req, res) => {
    const { id } = req.params

    const modelo = await Articulo.findById(id)
        if (!modelo) {
            return res.status(400).json({ msg: `No existe un usuario con el id ${id}` })
        }

    //verificamos si tiene el campo imagen, si tiene el campo imagen es por que ya hay una imagen previa
    if (modelo.imagen) {
        const pathImage = `${process.cwd()}/uploads/${modelo.imagen}` //creamos la ruta de la imagen previa
        //verificamos si existe la imagen
        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage)
        }
    }
    const pathImage = `${process.cwd()}/assets/no-image.jpg`
    return res.sendFile(pathImage)
}

const buscador = async (req,res)=> {
    
    const { busqueda } = req.params

    try {

        const respuesta = await Articulo.find({
            "$or":[
                {"titulo":{"$regex":busqueda,"$options":"i"}},
                {"contenido":{"$regex":busqueda,"$options":"i"}}
            ]
        })
        .sort({fecha:-1})

        if(!respuesta.length){
            return res.status(404).json({status:"error",msg:"No se han encontrado articulos"})
        }
        
        res.status(200).json({status:"success",respuesta})

    } catch (error) {
        return res.status(404).json({status:"error1",msg:error})
    }

}


export { 
        test, 
        curso, 
        mensajes, 
        crearArticulo, 
        listarArticulos, 
        getarticulofindById, 
        deletearticuloforid,
        editar,
        cargarArchivo,
        actualizarImagen,
        mostrarImagen,
        buscador
    };
