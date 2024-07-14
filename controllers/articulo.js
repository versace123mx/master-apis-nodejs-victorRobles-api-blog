const test = (req,res) => {
    res.status(200).json({msg:'Hola Maria Jose mi amor'})
}

const curso = (req,res) => {
    res.status(200).json({msg:'Esta es la ruta de curso'})
}

const mensajes = (req,res) =>{
    res.status(200).json({msg:'Esta es la ruta de curso'})
}

export {
    test,
    curso,
    mensajes
}