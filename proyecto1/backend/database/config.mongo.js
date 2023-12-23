const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.DB_MONGO_CONNECTION);

        console.log('MongoDB Connected');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar MongoDB');
    }
}

module.exports = {
    dbConnection
}