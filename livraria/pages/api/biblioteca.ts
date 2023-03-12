import { NextApiRequest, NextApiResponse } from "next";
import { livrariaModel } from "@/models/livrariaModel";
import { conectarMongoDB } from "@/middlewares/conectaMongoDB";

const biblioteca = async (req: NextApiRequest, res: NextApiResponse) => {

    //Listar todos os livros catalogados.
    if (req.method === 'GET') {
        const livrosCatalogados = await livrariaModel.find({})
        return res.status(200).json(livrosCatalogados) 
        
    }
}

export default conectarMongoDB(biblioteca)