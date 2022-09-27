const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://vardaan:VardaanVerma@raunaktemp.cunc7hy.mongodb.net/?retryWrites=true&w=majority',
    {}
);

const schema = new mongoose.Schema(
{ 
        Name: 'string',
        Type: 'string', 
        Breed: 'string', 
        Age: Number 
});

const Pet = mongoose.model('Pet-Table', schema);

module.exports=Pet;