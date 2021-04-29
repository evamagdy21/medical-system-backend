const express = require('express');
const router = express.Router();
const controller = require('./insurance.controller');
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
router.post('/uae/insurance-companies', upload.single('logo'), controller.Create_Insurance_Company);
router.get('/uae/insurance-companies',controller.Insurance_get_all);
router.get('/uae/insurance-companies/:insurancelId', controller.InsuranceCompanies_get_company);

module.exports = router;