const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    groupId:{
        type:String,
        required:true
    },
    
    topicMarks:{
        type:Number,
        required:true
    },

    topicFeedBack:{
        type:String,
        required:true
    },

    presentationMark:{
        type:Number,
        required:true
    },

    presentationFeedBack:{
        type:String,
        required:false
    }

});

module.exports = mongoose.model('Posts',postSchema);