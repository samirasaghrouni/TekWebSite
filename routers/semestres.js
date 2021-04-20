const { model } = require("mongoose");
const {semestre,validation_semestre,validaion_update}=require("../models/semestre")
const router=require('express').Router();
const _=require('lodash');

router.get('',async(req,res)=>{
  res.send(await semestre.find());
});

router.get('/:id',async(req,res)=>{
    let falm=await semestre.findById(req.params.id)
    res.send(falm)
})
router.post('',async(req,res)=>{
    let validation=validation_semestre(req.body);
    
    if(validation.error)
    return res.status(400).send(validation.error.details[0].message);

    let semestre =new semestre(_.pick(req.body,'name','acteur'));
    try {
        semestre = await semestre.save();
    } catch (error) {

        res.status(400).send("Save in DB Error"+ error.message)
    }
    
    res.send(semestre);
})

router.put('/:id',async(req,res)=>{
    let validation=validaion_update(req.body)
    if(validation.error)
     return res.status(404).send(validation.error.details[0].message)

    let semestre = await semestre.findById(req.params.id);
    semestre = _.merge(semestre,req.body);
    semestre = await semestre.save();
    res.send(semestre);
});

router.delete('/:id',async (req,res) => {
    let semestre = await semestre.findById(req.params.id)
    await semestre.deleteOne({_id: req.params.id})
    res.send(semestre);
});

module.exports = router;
