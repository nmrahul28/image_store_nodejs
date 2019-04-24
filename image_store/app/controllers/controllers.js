var Busboy = require('busboy');
var path = require('path');
var fs = require('fs');
var db = require('../model/model.js');
var RandomString=require('randomstring');
exports.post_image = (req, res) => {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', (fieldname, file, filename) => {
        var file_path = path.join('./image_fold', filename);
        console.log('Uploading: ' + file_path);
        file.pipe(fs.createWriteStream(file_path));
        const data = new db.image_model();
        data.url = file_path;
        data.fileName = filename;
        data.save().then((respo) => {
            res.json(respo);
        }).catch((err) => {
            console.log(err);
        })
    });
    busboy.on('finish', () => {
        console.log('Image uploaded');
    });

    return req.pipe(busboy);
}

exports.base64 = (req, res) => {
    var base64Data = req.body.image.replace(/^data:image\/(?:jpeg|jpg|JPEG|JPG|png|PNG);base64,/, "");
    var data=req.body.image
    var extension_type= data.substring(data.indexOf('/')+1, data.indexOf(';base64'));
    var filename = RandomString.generate(7)
    //let extension, lowerCaseData = base64Data.toLowerCase();
    if (extension_type=='png') {
        extension = '.png'
    } else if (extension_type=='jpg') {
        extension = '.jpg'
    } else if (extension_type=='jpeg') {
        extension = '.jpeg'
    }
    fs.writeFile('./image_fold/' + filename + extension, base64Data, 'base64', (err) => {
        const new_data = new db.image_model();
        new_data.url = '/image_fold/' + filename + extension,
        new_data.fileName = filename
        new_data.save().then((respo) => {
            res.json(respo);
        }).catch((err) => {
            console.log(err);
        });
    });
}
