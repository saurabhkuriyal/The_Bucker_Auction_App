const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const multer = require('multer');
const flyerController=require('../controllers/flyer.controller')
const path = require('path');

// Set up multer for file uploads
const upload = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 10 * 1025 * 1024 },
});

router.use(bodyParser.json());

router.route("/createflyer").post(upload.single('image'), flyerController.createFlyer);
//router.route("/").get(flyerController.getAllFlyers);

module.exports = router;