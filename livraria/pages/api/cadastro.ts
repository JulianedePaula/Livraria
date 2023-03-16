import { NextApiRequest, NextApiResponse } from "next";
import type { livrosRequisicao } from "@/types/livrosRequisicao";
import { livrariaModel } from "@/models/livrariaModel";
import { conectarMongoDB } from "@/middlewares/conectaMongoDB";
import { updload, uploadImagemCosmic } from "@/services/uploadImagemCosmic";
import nc from 'next-connect'

const handler = nc()
    .use(updload.single('file'))
    .post(async (req: NextApiRequest, res: NextApiResponse) => {

        //Incluindo livros no sistema.

        const livro = req.body as livrosRequisicao

        //enviar a imagem do multer para o cosmic
        const image = await uploadImagemCosmic(req)

        const livroCatalogado = {
            titulo: livro.titulo,
            autor: livro.autor,
            capa: image?.media?.url 
        }

        //Retorno incluindo os dados no Mongo.
        await livrariaModel.create(livroCatalogado)
        return res.status(200).json({ msg: "Livro catalogado." })
    })  

export const config = {
    api: {
        bodyParse: false
    }
}

export default conectarMongoDB(handler)