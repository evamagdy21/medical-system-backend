const InsuranceModel = require('../../models/Insurance');
const mongoose = require('mongoose');



// Save a new insurance company or clinic to database.
exports.Create_Insurance_Company = (req, res) => {
    const insurance_companies = new InsuranceModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        address: req.body.address,
        founded: req.body.founded,
        location: req.body.location,
        logo: `https://medicalsystem.herokuapp.com/profile/${req.file.filename}`,
        phone: req.body.phone,
        leadership: req.body.leadership,
        overview: req.body.overview,
        websiteLink: req.body.websiteLink,
        timings: req.body.timings
    });
    return insurance_companies
        .save()
        .then(result => {
            res.status(201).json({
                message: "Created Insurance Company Successfully",
                insurance_companies: {
                    _id: result._id,
                    name: result.name,
                    address: result.address,
                    founded: result.founded,
                    location: result.location,
                    logo: result.logo,
                    phone: result.phone,
                    leadership: result.leadership,
                    overview: result.overview,
                    websiteLink: result.websiteLink,
                    timings: result.timings,

                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// find all Insurance companies  from database.
exports.Insurance_get_all = (req, res) => {
    InsuranceModel.find()
        .select('name address founded location logo phone leadership  overview websiteLink timings')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                insurance_companies: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        address: doc.address,
                        founded: doc.founded,
                        location: doc.location,
                        logo: doc.logo,
                        phone: doc.phone,
                        leadership: doc.leadership,
                        overview: doc.overview,
                        websiteLink: doc.websiteLink,
                        timings: doc.timings,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/uae/insurance-companies' + doc._id

                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.logo(err);
            res.status(500).json({
                error: err
            });
        });
}

// find a insurance company from database.
exports.InsuranceCompanies_get_company = (req, res, next) => {
    const id = req.params.insurancelId;
    console.log(id)
    InsuranceModel.findById(id)
        .select('name address founded location _id logo phone overview leadership websiteLink timings')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    insurance_companies: doc,
                });
            }
            else {
                res.status(404).json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

}