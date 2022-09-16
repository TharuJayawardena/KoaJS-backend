const mongoose = require('mongoose');

const timetableSchema = mongoose.Schema({

    moduleName: {
        type: String,
        require: true
    },
    allocatedTime: {
        type: String,
        require: true
    }
}) 

const timetable = mongoose.model('timetables',timetableSchema);
module.exports = timetable;