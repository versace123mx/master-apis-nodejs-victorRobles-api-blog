import Articulo from "../models/Articulo.js";

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


export { test, curso, mensajes, crearArticulo, listarArticulos, getarticulofindById, deletearticuloforid };
