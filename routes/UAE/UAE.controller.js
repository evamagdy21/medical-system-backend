const HttpResponsesConst = require('../../constants/http-responses.constant');
const formatResponse = require('../../constants/response-format-constant').formatResponse;
const UAEModel = require('../../models/uae');
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;



// Save a new UAE or clinic to database.
exports.UAES_create_UAE = (req, res, next) => {

  const uae = new UAEModel({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    image: `https://medicalsystem.herokuapp.com/profile/${req.file.filename}`,
    hospitals_clinics: req.body.hospitalId,
    insurance_companies: req.body.insuranceId,
    pharmacies:req.body.pharmacyId
  });
  return uae
    .save()

    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'uae stored',
        uae: {
          _id: result._id,
          name: result.name,
          image: result.image,
          hospitals_clinics: result.hospitals_clinics,
          insurance_companies: result.insurance_companies,
          pharmacies:result.pharmacies
        },
        request: {
          type: 'GET',
          url: 'http://localhost:3000/uae/' + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });


}

// find all UAES from database.
exports.UAES_get_all = (req, res, next) => {
  UAEModel
    .find()
    .select('image name _id hospitals_clinics insurance_companies pharmacies')
    .populate('hospitals_clinics insurance_companies pharmacies')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        uae: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            image: doc.image,
            hospitals_clinics: doc.hospitals_clinics,
            insurance_companies: doc.insurance_companies,
            pharmacies:doc.pharmacies,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/uae/' + doc._id
            }
          }
        })

      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}


exports.UAES_patch_UAE = (req, res, next) => {

  var updateObject = req.body;

  UAEModel.updateOne(
    { "_id": new ObjectId(req.params.UAEId), deletedAt: null },
    {
      $set: {
        "name": updateObject.name,
      },

    },
    { multi: false, runValidators: true, omitUndefined: 1 },
  ).exec()
    .then(result => {
      res.status(200).json({
        message: 'UAE updated',
        uae: result,

      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
}

// find a UAE from database.
exports.UAES_get_UAE = (req, res, next) => {
  const id = req.params.UAEId;
  UAEModel.findById(id)
    .select('image name _id hospitals_clinics insurance_companies pharmacies')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          uae: doc,
          request: {
            type: 'GET',
            description: 'Get_all_products',
            url: 'http://localhost:3000/uae/'
          }
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



