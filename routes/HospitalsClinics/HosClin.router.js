const express = require('express');
const router = express.Router();
const controller = require('./HosClin.controller');
const multer = require('multer');
const path = require('path');

//storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage: storage,

})

router.get('/uae/hospitals/', controller.HospitalsClinics_get_all);
router.post('/uae/hospitals/', upload.single('logo'), controller.Create_Hospitals_Clinics);
router.get('/uae/hospitals/:hospitalId', controller.Hospitals_get_Hospital);
// router.put('/uae/hospitals/:hospitalId', controller.Hospitals_patch_Hospital);
router.delete('/uae/hospitals/:hospitalId', controller.Hospitals_delete);


module.exports = router;