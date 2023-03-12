import { NextApiRequest, NextApiResponse } from "next";
import { livrariaModel } from "@/models/livrariaModel";
import { conectarMongoDB } from "@/middlewares/conectaMongoDB";

const deletar = async (req: NextApiRequest, res: NextApiResponse) => {

    //Excluir um livro da biblioteca.
    if (req.method === 'DELETE') {
        await livrariaModel.findByIdAndDelete({_id: req.headers.id})
    }
}
export default conectarMongoDB(deletar)