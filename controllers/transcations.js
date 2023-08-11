const Transcation = require('../models/transcation');

const getTranscations = async (req,res)=>{
    try{
        const transcations = await Transcation.find({});
        return res.status(200).json({
            success: true,
            count: transcations.length,
            data: transcations
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            error: 'Server Error'
        });
    }
};

const addTranscation = async(req,res)=>{
    try{
        const {text,amount} = req.body;
        const transcation = await Transcation.create(req.body);

        return res.status(201).json({
            success: true,
            data: transcation
        });
    }catch(err){
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val=>val.message);

            return res.status(400).json({
                success:false,
                error:messages
            });
        }else{
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};

const deleteTranscation = async(req,res)=>{
    try{
        const transcation = await Transcation.findById({_id : req.params.id});

        if(!transcation){
            return res.status(404).json({
                success: false,
                error: "No transcation found"
            });
        }

        await transcation.remove();

        return res.status(200).json({
            success: true,
            data:{}
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

module.exports = {getTranscations,addTranscation,deleteTranscation};