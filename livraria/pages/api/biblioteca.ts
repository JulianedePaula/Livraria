import { NextApiRequest, NextApiResponse } from "next";
import { livrariaModel } from "@/models/livrariaModel";
import { conectarMongoDB } from "@/middlewares/conectaMongoDB";
import nc from 'next-connect'

const handler = nc()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {

        //Listar todos os livros catalogados.
        const livrosCatalogados = await livrariaModel.find({})
        return res.status(200).json(livrosCatalogados) 
            
        
    })

export const config = {
    api: {
        bodyParse: false
    }
}

export default conectarMongoDB(handler)