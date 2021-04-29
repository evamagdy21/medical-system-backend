const express = require('express');
const router = express.Router();
const controller = require('./pharmacies.controller');
const multer = require('multer');
const path = require('path');

// storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage: storage,
})
router.post('/uae/pharmacies', upload.single('logo'), controller.Create_Pharmacy);
router.get('/uae/pharmacies',controller.Pharmacis_get_all);
router.get('/uae/pharmacies/:pharmacyId', controller.Pharmacies_get_Pharmacy);

module.exports = router;