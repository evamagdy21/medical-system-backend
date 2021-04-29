const mongoose = require('mongoose');

/** This is a Uae Schcema represent a model UAE on database. */
const UaeSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    name: String,
    image: String,
    hospitals_clinics: [{type: mongoose.Schema.Types.ObjectId, ref: 'hospitals_clinics' }],
    insurance_companies:[{type: mongoose.Schema.Types.ObjectId, ref: 'insurance_companies'}],
    pharmacies:[{type: mongoose.Schema.Types.ObjectId, ref: 'pharmacies'}]
})

 module.exports = mongoose.model('UAE', UaeSchema);

