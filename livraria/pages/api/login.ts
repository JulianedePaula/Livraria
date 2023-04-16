import { conectarMongoDB } from "@/middlewares/conectaMongoDB"
import { usuariosModelLivraria } from "@/models/usuariosModelLivraria"
import md5 from "md5"
import nc from "next-connect"
import { NextApiRequest, NextApiResponse } from "next"
import  jwt  from 'jsonwebtoken';

const loginEndPoint = nc ()

    .post(async (req: NextApiRequest, res: NextApiResponse) => {

        const {MINHA_CHAVE_JWT} = process.env
            if(!MINHA_CHAVE_JWT){
                return res.status(500).json({msg: 'ENV JWT não informada.'})
            }
        const {login, senha} = req.body
        
        const usuariosEncontrados = await usuariosModelLivraria.find({email: login, senha: md5(senha)})
        if (usuariosEncontrados && usuariosEncontrados.length > 0){
            const usuarioEncontrado = usuariosEncontrados[0];

            const token = jwt.sign({_id: usuarioEncontrado._id}, MINHA_CHAVE_JWT)

            return res.status(200).json({
                nome : usuarioEncontrado.nome, email : usuarioEncontrado.email, token})
        }
        return res.status(400).json({erro: 'Usuario ou senha não identificado.'})
    

    })

export default conectarMongoDB(loginEndPoint)