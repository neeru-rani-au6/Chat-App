
const multer = require("multer");
const fs = require("fs");


module.exports = {
    async UploadImage(req, res) {
        console.log(req.body)
        try {
            var upload = multer({ storage: storage }).single("file")
            var storage = multer.diskStorage({
            destination: function (req, file, cb) {
               cb(null, 'uploads/')
               },
           filename: function (req, file, cb) {
           cb(null, `${Date.now()}_${file.originalname}`)
            },
           })
           upload(req, res, err => {
            if(err) {
              return res.json({ success: false, err })
            }
            return res.json({ success: true, url: res.req.file.path });
          })
         }
         catch (error) {
            console.log(error)
           res.status(400).send(error);
          }
    }
   }


