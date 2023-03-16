import multer from "multer";
import cosmicjs from "cosmicjs";

const {
    CHAVE_GRAVACAO_LIVROS,
    BUCHET_LIVROS
} = process.env

const Cosmic = cosmicjs()
const bucketLivros = Cosmic.bucket ({
    slug: BUCHET_LIVROS,
    write_key: CHAVE_GRAVACAO_LIVROS,
})


const storage = multer.memoryStorage()
const updload = multer({storage: storage})

const uploadImagemCosmic = async (req: any) => {
    if(req?.file?.originalname) {
        const media_object = {
            originalname: req.file.originalname,
            buffer: req.file.buffer
        }
        if(req.url && req.url.includes('livros')){
            return await bucketLivros.addMedia({media: media_object})
        }
    }
}
export {updload, uploadImagemCosmic}