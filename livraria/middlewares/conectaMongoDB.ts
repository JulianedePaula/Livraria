import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import mongoose from 'mongoose';

export const conectarMongoDB = (handler: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
    // VERIFICAR SE O BANCO ESTÁ CONECTADO E SE ESTÁ TRAZENDO ALGUMA COISA
    if(mongoose.connections[0].readyState) {
        return handler(req, res);
    }
    
    // SE NÃO ESTIVER CONECTADO, VAMOS FORÇAR A CONECÇÃO 
    const {CONECTA_MONGO} = process.env;
        // SE A ENV ESTIVER VAZIA, O USUARIO SERÁ INFORMADO
    if (!CONECTA_MONGO){
        return res.status(500).json({erro: 'ENV de informação do banco não encontrado.'})
    }

    mongoose.connection.on('connected', () => console.log('Banco de dados conectado.'));
    mongoose.connection.on('error', error => console.log(`Ocorreu um erro no banco de dados ${error}`));

    await mongoose.connect(CONECTA_MONGO);

    //AGORA POSSO SEGUIR POIS ESTOU CONECTADO NO BANCO
    return handler(req, res)
}