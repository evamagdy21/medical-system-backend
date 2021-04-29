const mongoose = require('mongoose');

/** This is a Pharmacies Schcema represent a model pharmacies on database. */
const PharmaciesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    address: String,
    founded:Number,
    location: String, 
    logo: String,
    phone: String,
    leadership:String,
    overview: String,
    websiteLink: String,
    timings: String
})

module.exports = mongoose.model('pharmacies', PharmaciesSchema)