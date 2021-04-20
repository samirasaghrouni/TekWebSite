const { model } = require("mongoose");
const {groupe,validation_groupe,validaion_update}=require("../models/groupe")
const router=require('express').Router();
const _=require('lodash');

router.get('',async(req,res)=>{
  res.send(await groupe.find());
});

router.get('/:id',async(req,res)=>{
    let falm=await groupe.findById(req.params.id)
    res.send(falm)
})
router.post('',async(req,res)=>{
    let validation=validation_groupe(req.body);
    
    if(validation.error)
    return res.status(400).send(validation.error.details[0].message);

    let groupe =new groupe(_.pick(req.body,'name','acteur'));
    try {
        groupe = await groupe.save();
    } catch (error) {

        res.status(400).send("Save in DB Error"+ error.message)
    }
    
    res.send(groupe);
})

router.put('/:id',async(req,res)=>{
    let validation=validaion_update(req.body)
    if(validation.error)
     return res.status(404).send(validation.error.details[0].message)

    let groupe = await groupe.findById(req.params.id);
    groupe = _.merge(groupe,req.body);
    groupe = await groupe.save();
    res.send(groupe);
});

router.delete('/:id',async (req,res) => {
    let groupe = await groupe.findById(req.params.id)
    await groupe.deleteOne({_id: req.params.id})
    res.send(groupe);
});

module.exports = router;
