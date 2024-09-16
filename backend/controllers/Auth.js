import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) =>{
    const user = await User.findOne({
        where:{
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role});        ///no se analiza el usuario aqui porque neceitamos la contraseña
}


export const Me = async (req, res) => {
    try {
        // Verificar si ya hay un UUID en la sesión
        if (!req.session.userId) {
            return res.status(401).json({ msg: "Por favor, inicie sesión en su cuenta." });
        }

        console.log("UUID en sesión:", req.session.userId); // Esto debería ser el UUID del usuario

        // Buscar el usuario usando el UUID almacenado como userId
        const user = await User.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId // Buscar por el UUID
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado." });
        }

        // Retornar el usuario
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: "Error al recuperar los datos del usuario." });
    }
};



export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    })
}