import { conectarMongoDB } from "@/middlewares/conectaMongoDB"
import { validarTokenJWT } from "@/middlewares/validarTokenJWT"
import { livrariaModel } from "@/models/livrariaModel"
import { pedidosModel } from "@/models/pedidosModel"
import { usuariosModelLivraria } from "@/models/usuariosModelLivraria"
import { pedidosRequisicao } from "@/types/pedidosRequisicao"
import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"

const pedidosEndpoint = nc()
  //Solicitação de um pedido.
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const {userId, idLivro} = req.query
    const pedido = req.body

    const usuario = await usuariosModelLivraria.findById(userId)
    if(!usuario){
        return res.status(404).json({erro: 'Usuario não encontrado.'})
    }
    const usuarioEncontrado = await usuariosModelLivraria.findById(usuario._id)
    usuarioEncontrado.senha = null

    const livroEncontrado = await livrariaModel.findById(idLivro)
    
    if(!livroEncontrado){
        return res.status(404).json({erro: 'Livro não encontrado.'})
    }

    const novoPedido = {
        idUsuario: usuarioEncontrado,
        idLivro: livroEncontrado,
        valor: pedido.valor,
        status: "NOVO"
    }
    await pedidosModel.create(novoPedido)
    res.status(200).json({msg: 'Pedido criado com sucesso.'})
  })
  .get(async (req: NextApiRequest, res: NextApiResponse)=>{
    //Retornar o pedido pelo ID.
    try {
      const {pedidoId} = req.query

      const pedido = await pedidosModel.findById(pedidoId)

      const pedidoEncontrado = await pedidosModel.findById(pedido._id)
      if(!pedidoEncontrado){
        return res.status(404).json({msg: 'Pedido não encontrado.'})
      }      
      
      return res.status(200).json({data: pedidoEncontrado})
      
  } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro na solicitação de localizar o pedido.'})
  }
  })
  .put(async(req: NextApiRequest, res: NextApiResponse)=>{
    //Incluir um status para o pedido de "FINALIZADO".
    try {
      const {pedidoId} = req.query

      const pedidoEncontrado = await pedidosModel.findById(pedidoId)
      if(!pedidoEncontrado){
        return res.status(404).json({msg: 'Pedido não encontrado.'})
      }
      pedidoEncontrado.status = 'FINALIZADO'

      await pedidosModel.findOneAndUpdate({_id: pedidoId}, pedidoEncontrado)
      return res.status(200).json({msg: 'Pedido atualizado com sucesso.'})

    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao tentar atualizar o status do pedido.'})
    }
  })
  .delete(async(req: NextApiRequest, res: NextApiResponse)=>{
    //Deletar apenas pedidos que não estejam finalizados.
    try {
      const {pedidoId} = req.query

      const pedidoEncontrado = await pedidosModel.findById(pedidoId)
      if(!pedidoEncontrado){
        return res.status(404).json({msg: 'Pedido não encontrado.'})
      }
      if(pedidoEncontrado.status === 'FINALIZADO'){
        return res.status(404).json({msg: 'Pedidos finalizados não podem ser excluidos.'})
      }
      await pedidosModel.findByIdAndDelete(pedidoId)
      return res.status(200).json({msg: 'Pedido excluido com sucesso.'})
      
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg: 'Erro ao tentar excluir o pedido.'})
    }
  })

export default validarTokenJWT(conectarMongoDB(pedidosEndpoint))