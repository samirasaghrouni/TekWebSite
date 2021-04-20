const mongoose=require("mongoose")
const joi=require('joi');

const matièreSchema=new mongoose.Schema({
    id:{type:Number,require:true},
    nom:{type:String,require:true},
    noteDs:{type:String,require:true},
    noteExam:{type:String,require:true},
    noteTp:{type:Number},
    moyGeneral:{type:String,require:true},
    coefficient:{type:String,require:true},

    groupe:{
        id : { type : mongoose.Schema.Types.ObjectId, ref: 'groupe'}
        , name : String 
    },
    
   
   semestre:{
        id : { type : mongoose.Schema.Types.ObjectId, ref: 'semestre'}
        , name : String 
    }
    
});

let matière_validation_schema={
    id:joi.string().required(),
    nom:joi.string().required(),
    noteDs:joi.string().required(),
    noteExam:joi.string().required(),
    moyGeneral:joi.string().required(),
    coefficient:joi.string().required(),
    groupe:{
        id :joi.string(),
        name:joi.string()


    },
    semestre:{
        id :joi.string(),
        name:joi.string()


    },
    
}
let matière_update_schema={
    noteTp:joi.number().min(0).max(20)
   
}
function validation_matière(body){
    return joi.validate(body,matière_validation_schema);
}
function validaion_update(body){
    return joi.validate(body,matière_update_schema);
}

const matière=mongoose.model("matière",matièreSchema);
module.exports.matière=matière;
module.exports.validation_matière=validation_matière;
module.exports.validaion_update=validaion_update;
