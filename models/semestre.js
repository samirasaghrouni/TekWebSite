const mongoose=require("mongoose")
const joi=require('joi');

const semestreSchema=new mongoose.Schema({
    id:{type:Number,require:true},
    nom:{type:String,require:true},
   

   matière:{
        id : { type : mongoose.Schema.Types.ObjectId, ref: 'matière'}
        , name : String 
    },
    
   
  
    
});

let semestre_validation_schema={
    id:joi.string().required(),
    nom:joi.string().required(),
   
    matière:{
        id :joi.string(),
        name:joi.string()


    },
    
}
let semestre_update_schema={
    noteTp:joi.number()
   
}
function validation_semestre(body){
    return joi.validate(body,semestre_validation_schema);
}
function validaion_update(body){
    return joi.validate(body,semestre_update_schema);
}

const semestre=mongoose.model("semestre",semestreSchema);
module.exports.semestre=semestre;
module.exports.validation_semestre=validation_semestre;
module.exports.validaion_update=validaion_update;
