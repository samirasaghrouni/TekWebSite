const mongoose=require("mongoose")
const joi=require('joi');

const groupeSchema=new mongoose.Schema({
    id:{type:Number,require:true},
    nom:{type:String,require:true},
    specialité:{type:String,require:true},
    niveau:{type:String,require:true},
    mail:{type:String,require:true},
   
    
    matière:{
        id : { type : mongoose.Schema.Types.ObjectId, ref: 'matière'}
        , name : String 
    }
});

let groupe_validation_schema={
    id:joi.string().required(),
    nom:joi.string().required(),
    specialité:joi.string().required(),
    niveau:joi.string().required(),
    mail:joi.string().required(),
    matière:{
        id :joi.string(),
        name:joi.string()


    },
    
}
let groupe_update_schema={
   
}
function validation_groupe(body){
    return joi.validate(body,groupe_validation_schema);
}
function validaion_update(body){
    return joi.validate(body,groupe_update_schema);
}

const groupe=mongoose.model("groupe",groupeSchema);
module.exports.groupe=groupe;
module.exports.validation_groupe=validation_groupe;
module.exports.validaion_update=validaion_update;
