const mongoose = require('mongoose');

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try{
        mongoose.connect(process.env.DB);
        console.log("Successfully connected to database");
    }
    catch(error){
        console.log(error);
        console.log("Failed connection do database");
    }
};