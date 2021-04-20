const { model } = require("mongoose");
const {matière,validation_matière,validaion_update}=require("../models/matière")
const router=require('express').Router();
const _=require('lodash');
router.get('',async(req,res)=>{
  res.send(await matière.find());
});

router.get('/:id',async(req,res)=>{
    let falm=await matière.findById(req.params.id)
    res.send(falm)
})
router.post('',async(req,res)=>{
    let validation=validation_matière(req.body);
    
    if(validation.error)
    return res.status(400).send(validation.error.details[0].message);

    let matière =new matière(_.pick(req.body,'name','acteur'));
    try {
        matière = await matière.save();
    } catch (error) {

        res.status(400).send("Save in DB Error"+ error.message)
    }
    
    res.send(matière);
})

router.put('/:id',async(req,res)=>{
    let validation=validaion_update(req.body)
    if(validation.error)
     return res.status(404).send(validation.error.details[0].message)

    let matière = await matière.findById(req.params.id);
    matière = _.merge(matière,req.body);
    matière = await matière.save();
    res.send(matière);
});

router.delete('/:id',async (req,res) => {
    let matière = await matière.findById(req.params.id)
    await matière.deleteOne({_id: req.params.id})
    res.send(matière);
});

module.exports = router;
