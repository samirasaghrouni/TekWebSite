const { model } = require("mongoose");
const {Etudiant,validation_Etudiant,validaion_update}=require('../models/Etudiant')
const router=require('express').Router();
const _= require('lodash');

router.get('',async(req,res)=>{
  res.send(await Etudiant.find());
});

router.get('/:id',async(req,res)=>{
    let Etudiant=await Etudiant.findById(req.params.id)
    res.send(Etudiant)
})
router.post('',async(req,res)=>{
    let validation=validation_Etudiant(req.body);
    
    if(validation.error)
    return res.status(400).send(validation.error.details[0].message);

    let Etudiant =new Etudiant(_.pick(req.body,'name','acteur'));
    try {
        Etudiant = await Etudiant.save();
    } catch (error) {

        res.status(400).send("Save in DB Error"+ error.message)
    }
    
    res.send(Etudiant);
})

router.put('/:id',async(req,res)=>{
    let validation=validaion_update(req.body)
    if(validation.error)
     return res.status(404).send(validation.error.details[0].message)

    let Etudiant = await Etudiant.findById(req.params.id);
    Etudiant = _.merge(Etudiant,req.body);
    Etudiant = await Etudiant.save();
    res.send(Etudiant);
});

router.delete('/:id',async (req,res) => {
    let Etudiant = await Etudiant.findById(req.params.id)
    await Etudiant.deleteOne({_id: req.params.id})
    res.send(Etudiant);
});

module.exports = router;
