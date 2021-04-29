const HttpResponsesConst = require('../../constants/http-responses.constant');
const formatResponse = require('../../constants/response-format-constant').formatResponse;
const HospClinicModel = require('../../models/HospitalsClinics')
const mongoose = require('mongoose');


// Save a new hospital or clinic to database.
exports.Create_Hospitals_Clinics = (req, res, next) => {

  const Hospitals_Clinics = new HospClinicModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    address: req.body.address,
    founded: req.body.founded,
    location: req.body.location,
    logo: `https://medicalsystem.herokuapp.com/profile/${req.file.filename}`,
    phone: req.body.phone,
    numberOfBeds: req.body.numberOfBeds,
    expertise: req.body.expertise,
    postalCode: req.body.postalCode,
    overview: req.body.overview,
    leadership: req.body.leadership,
    websiteLink: req.body.websiteLink,
    numberOfStaff: req.body.numberOfStaff,
    timings: req.body.timings

  });
  return Hospitals_Clinics
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created HospitalsClinics successfully!",
        hospitals_clinics: {
          name: result.name,
          address: result.address,
          founded: result.founded,
          location: result.location,
          logo: result.logo,
          phone: result.phone,
          numberOfBeds: result.numberOfBeds,
          expertise: result.expertise,
          postalCode: result.postalCode,
          overview: result.overview,
          leadership: result.leadership,
          websiteLink: result.websiteLink,
          numberOfStaff: result.numberOfStaff,
          timings: result.timings,
          _id: result._id,

          result: {
            type: 'GET',
            url: 'http://localhost:3000/uae/hospitals/' + result._id
          }

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


// find all Hospitals Clinics from database.

exports.HospitalsClinics_get_all = (req, res, next) => {
  HospClinicModel.find()
    .select('name address founded location _id logo phone numberOfBeds expertise postalCode overview leadership websiteLink numberOfStaff timings')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        hospitals_clinics: docs.map(doc => {
          return {
            name: doc.name,
            address: doc.address,
            founded: doc.founded,
            location: doc.location,
            logo: doc.logo,
            phone: doc.phone,
            numberOfBeds: doc.numberOfBeds,
            expertise: doc.expertise,
            postalCode: doc.postalCode,
            overview: doc.overview,
            leadership: doc.leadership,
            websiteLink: doc.websiteLink,
            numberOfStaff: doc.numberOfStaff,
            timings: doc.timings,
            _id: doc._id,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/uae/hospitals' + doc._id

            }
          }
        })
      };
      res.status(200).json(response);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}


// find a hospital or a clinic from database.
exports.Hospitals_get_Hospital = (req, res, next) => {
  const id = req.params.hospitalId;
  console.log(id)
  HospClinicModel.findById(id)
    .select('name address founded location _id logo phone numberOfBeds expertise postalCode overview leadership websiteLink numberOfStaff timings')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          hospitals_clinics: doc,
          request: {
            type: 'GET',
            description: 'Get_all_Hospitals',
            url: 'http://localhost:3000/uae/hospitals'
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

// exports.Hospitals_patch_Hospital = (req, res, next) => {
//   const id = req.params.hospitalId;
//   console.log(id)
//   const updateOps = {};
//   for (const ops of req.body) {
//     updateOps[ops.propName] = ops.value;
//   }
//   HospClinicModel.updateOne({ _id: id }, { $set: updateOps })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: 'Hospital updated',
//         request: {
//           type: 'GET',
//           url: 'http://localhost:3000/uae/hospitals/' + id
//         }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// }

// delete a hospital from database.
exports.Hospitals_delete = (req, res, next) => {
  const id = req.params.hospitalId;
  HospClinicModel.findOneAndRemove({ _id: id })//updated function from .remove()
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Hospital removed successfully",
        request: {
          type: 'POST',
          url: 'http://localhost:3000/uae/hospitals/',
          body: { name: 'String', Address: 'String', founded: "Number", location: "String" }
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

