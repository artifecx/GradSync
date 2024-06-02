const mongoose = require('mongoose')

const databaseConnection = () => {
    console.log(process.env.DB);
    mongoose.connect(process.env.DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data)=>{
        console.log(`database connected successfully at server ${data.connection.host}`)
    })
}

module.exports = databaseConnection