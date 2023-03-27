import mongoose, { Schema } from "mongoose";

const livrariaSchema = new Schema ({
    titulo : {type: String, require: true},
    autor : {type: String, require: true},
    capa : {type: String, require: false}
})

export const livrariaModel = (
    mongoose.models.testelivraria ||
    mongoose.model('testelivraria', livrariaSchema)
)