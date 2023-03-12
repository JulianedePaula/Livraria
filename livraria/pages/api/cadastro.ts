import { NextApiRequest, NextApiResponse } from "next";
import type { livrosRequisicao } from "@/types/livrosRequisicao";
import { livrariaModel } from "@/models/livrariaModel";
import { conectarMongoDB } from "@/middlewares/conectaMongoDB";

const endpointCadastro = async (req: NextApiRequest, res: NextApiResponse) => {

    //Incluindo livros no sistema.
    if(req.method === 'POST'){
        const livro = req.body as livrosRequisicao
        
        const livroCatalogado = {
            titulo: livro.titulo,
            autor: livro.autor,
        }

        //Retorno incluindo os dados no Mongo.
        await livrariaModel.create(livroCatalogado)
        return res.status(200).json({msg: "Livro catalogado."})

    }
    
    
}

export default conectarMongoDB(endpointCadastro)