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

export { test, curso, mensajes, crearArticulo };
