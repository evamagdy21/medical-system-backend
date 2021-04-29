const express = require('express');
const router = express.Router();
const controller = require('./UAE.controller');
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


router.post('/uae', upload.single('image'), controller.UAES_create_UAE);
router.put('/uae/:UAEId', controller.UAES_patch_UAE);
router.get('/uae/:UAEId', controller.UAES_get_UAE);
router.get('/uae', controller.UAES_get_all);



module.exports = router;

