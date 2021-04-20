const mongoose=require("mongoose")
const joi=require('joi');

const EtudiantSchema=new mongoose.Schema({
    id:{type:Number,require:true},
    cin:{type:Number,require:true},
    nom:{type:String,require:true},
    prenom:{type:String,require:true},
    mail:{type:String,require:true},
    password:{type:String,require:true},

    
    groupe:{
        id : { type : mongoose.Schema.Types.ObjectId, ref: 'groupe'}
        , nom : String 
    }
});

let Etudiant_validation_schema={
    nom:joi.string().required(),
    seance:{
        id :joi.string(),
        nom:joi.string()


    }
   
}
let Etudiant_update_schema={
   
}
function validation_Etudiant(body){
    return joi.validate(body,Etudiant_validation_schema);
}
function validaion_update(body){
    return joi.validate(body,Etudiant_update_schema);
}

const Etudiant=mongoose.model("Etudiant",EtudiantSchema);
module.exports.Etudiant=Etudiant;
module.exports.validation_Etudiant=validation_Etudiant;
module.exports.validaion_update=validaion_update;
