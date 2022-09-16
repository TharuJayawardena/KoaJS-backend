// const mongoose = require('mongoose');
// const connectionString = 'mongodb+srv://TharushiMadushani:Tharu123@researchprojectmanageme.n1iby.mongodb.net/?retryWrites=true&w=majority';
//
// const initDB = () => {
//     mongoose.connect(connectionString);
//     mongoose.connection.once('open',() => {
//         console.log('connected to db');
//     })
//     mongoose.connection.on('error', console.error);
//
// }
//
//
// module.exports = initDB;

const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://TharushiMadushani:Tharu123@researchprojectmanageme.n1iby.mongodb.net/?retryWrites=true&w=majority';

const initDB = () => {
    mongoose.connect(connectionString);
    mongoose.connection.once('open', () => {
        console.log('connected to db');
    })
    mongoose.connection.on('error', console.error);


}

module.exports = initDB;