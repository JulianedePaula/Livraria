import { NextApiRequest, NextApiResponse } from "next";
import { conectarMongoDB } from "@/middlewares/conectaMongoDB";
import { livrariaModel } from "@/models/livrariaModel";
import type { livrosRequisicao } from "@/types/livrosRequisicao";
import { updloadMulter, uploadImagemCosmic } from "@/services/uploadImagemCosmic";
import nc from 'next-connect'


const handler = nc()
    .use(updloadMulter.single('capa'))
    .post(async (req: any, res: NextApiResponse) => {

        //Cadastrar um livro na API.
        const livro = req.body as livrosRequisicao

        if (!livro) {
            return res.status(400).json({erro: "Informe os dados do livro que deseja cadastrar."})
        }

        if (!livro.titulo || livro.titulo.length < 0) {
            return res.status(400).json({erro: "Informe o titulo."})
        }

        if (!livro.autor || livro.autor.length < 0) {
            return res.status(400).json({erro: "Informe o autor."})
        }

        const image = await uploadImagemCosmic (req)

        const livroCatalogo = {
            titulo : livro.titulo,
            autor : livro.autor,
            capa: image?.media?.url
        }
    await livrariaModel.create(livroCatalogo)
    return res.status(201).json({msg: 'Livro catalogado com sucesso.'})
    })

    .get(async (req: any, res: NextApiResponse) =>{

        //Listar todos os livros catalogados.
        const livroCatalogo = await livrariaModel.find({})
        return res.status(200).json(livroCatalogo) 
    })

    .put(async (req: NextApiRequest, res: NextApiResponse) => {

        //Atualizar um livro pelo Id.
        const livroAtualizado = req.body as livrosRequisicao

        const {idLivro} = req.query

        const idEncontrado = await livrariaModel.findById(idLivro)

        if (!idEncontrado) {
            return res.status(404).json({erro: "Livro não encontrado."})
        }

        idEncontrado.autor = livroAtualizado.autor
        idEncontrado.titulo = livroAtualizado.titulo
        
        await livrariaModel.findByIdAndUpdate({_id: idLivro}, idEncontrado)
        return res.status(200).json({msg: "Livro atualizados com sucesso."})
    })

    .delete(async (req: NextApiRequest, res: NextApiResponse) => {

        //Deletar livros pelo Id.
        const {idLivro} = req.query

        const idEncontrado = await livrariaModel.findById(idLivro)

        if (!idEncontrado) {
            return res.status(404).json({erro: "Livro não encontrado."})
        }

        await livrariaModel.findByIdAndDelete(idLivro)

        return res.status(204).json({ msg: "Livro excluido com sucesso." })

    })

export const config = {
    api: {
        bodyParser: false
    }
}

export default conectarMongoDB(handler)