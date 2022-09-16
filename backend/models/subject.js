const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    moduleId: {
        type: String,
        require: true
    },
    moduleName: {
        type: String,
        require: true
    },
    duration: {
        type: Number,
        require: true
    },
    lectureIds: {
        type: String,
        require: true
    },
    acedemicYear: {
        type: Number,
        require: true
    }
})


const subject = mongoose.model('subjects', subjectSchema);
module.exports = subject;