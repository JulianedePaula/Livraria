import mongoose, { Schema } from "mongoose";

const usuariosSchemaLivraria = new Schema ({
    nome: {type: String, require: true},
    email: {type: String, require: true},
    senha: {type: String, require: true}
})

export const usuariosModelLivraria = (
    mongoose.models.usuarioLivraria ||
    mongoose.model('usuarioLivraria', usuariosSchemaLivraria)
)