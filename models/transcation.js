const mongoose = require('mongoose');

const TranscationSchema = new mongoose.Schema(
    {
        text:{
            type: String,
            trim: true,
            required: [true,'Please add some text']
        },
        amount:{
            type: Number,
            required: [true,'Please add a positive or negative amount']
        },
        createdAt:{
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model('Transcation',TranscationSchema);