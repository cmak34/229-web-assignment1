require('dotenv').config()
const mongoose = require('mongoose');

module.exports = {
    connect: () => {
        mongoose.set('strictQuery', false);
        return mongoose.connect(`mongodb://${process.env.USER_ID}:${process.env.USER_PASS}@localhost/${process.env.COLLECTION}`, { useNewUrlParser: true, useUnifiedTopology: true, });
    }
}