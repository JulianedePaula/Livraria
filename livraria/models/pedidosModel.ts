import mongoose, { Schema } from "mongoose";

const pedidosSchema = new Schema ({
    idUsuario: {type : String, required : true},
    idLivro: {type : String, required : true},
    valor: {type : Number, required : true},
    status: { type: String, required: true}
})

export const pedidosModel = (
    mongoose.models.pedidosModel ||
    mongoose.model('pedidosModel', pedidosSchema)
)