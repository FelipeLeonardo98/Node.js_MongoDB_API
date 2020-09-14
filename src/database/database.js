const mongoose = require('mongoose');

// Conexão com MongoDB
const connection = mongoose.connect('mongodb://localhost/tutorialcelke', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection with MongoDB was sucess!");
}).catch((fail) => {
    console.log("A fail has been ocurred..." + fail);
});

module.exports = connection;