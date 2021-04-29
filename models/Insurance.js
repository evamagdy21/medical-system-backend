const mongoose = require('mongoose');

/** This is a Insurance Companies Schcema represent a model insurance_companies on database. */
const InsuranceSchema = mongoose.Schema({
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

module.exports = mongoose.model('insurance_companies', InsuranceSchema)