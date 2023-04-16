import { conectarMongoDB } from "@/middlewares/conectaMongoDB"
import { validarTokenJWT } from "@/middlewares/validarTokenJWT"
import { usuariosModelLivraria } from "@/models/usuariosModelLivraria"
import { usuariosRequisicao } from "@/types/usuariosRequisicao"
import md5 from "md5"
import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"

const usuarioEndpoint = nc()
    //Cadastrar usuario.
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        
        try {
            const usuario = req.body as usuariosRequisicao

            if(!usuario){
                return res.status(400).json({ msg: "Requisição inválida" })
            }

            if(usuario.nome.length < 0){
                return res.status(400).json({ msg: "Nome é obrigatório" })
            }

            if(!usuario.email || usuario.email.length < 5){
                return res.status(400).json({ msg: "E-mail é obrigatório" })
            }

            const usuarioDuplicidade = await usuariosModelLivraria.find({ email: usuario.email })
            if (usuarioDuplicidade && usuarioDuplicidade.length > 0) {
                return res.status(400).json({ erro: 'Email já cadastrado.' })
            }

            const usuarioSalvo = {
                nome: usuario.nome,
                email: usuario.email,
                senha: md5(usuario.senha)
            }

        await usuariosModelLivraria.create(usuarioSalvo)
        return res.status(200).json({msg: 'Usuario criado com sucesso.'})
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({msg: 'Erro na solicitação de cadastrar o usuario.'})
        }
        
    })
    //Buscar usuario.
    .get(async (req: NextApiRequest, res: NextApiResponse) => {

        try {
            const {userId} = req.query

            const usuarioEncontrado = await usuariosModelLivraria.findById(userId)
            usuarioEncontrado.senha = null
            return res.status(200).json(usuarioEncontrado)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({msg: 'Erro na solicitação de localizar o usuario.'})
        }
        
    })
    //Atualização de senha.
    .put(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const {id} = req.query

            const senhaNova = req.body as usuariosRequisicao

            const usuarioEncontrado = await usuariosModelLivraria.findById(id)

            usuarioEncontrado.senha = senhaNova.senha
            await usuariosModelLivraria.findByIdAndUpdate({_id: id}, usuarioEncontrado)
            return res.status(204).json({msg: 'Senha atualizada.'})

        } catch (error) {
            console.log(error)
            return res.status(500).json({msg: 'Erro na solicitação de atualizar o usuario.'})
        }
    })

export default validarTokenJWT(conectarMongoDB(usuarioEndpoint))
