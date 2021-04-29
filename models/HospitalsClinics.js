const mongoose = require('mongoose');


/** This is a Hospitals Clinics Schcema represent a model hospitals_clinics on database. */
const HospitalsClinicsSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    name: String,
    address: String,
    founded: Number,
    location: String,
    logo: String,
    phone:String,
    numberOfBeds:Number,
    expertise:String,
    postalCode:Number,
    overview:String,
    leadership:String,
    websiteLink:String,
    numberOfStaff:Number,
    timings:String


});



module.exports = mongoose.model('hospitals_clinics', HospitalsClinicsSchema);
