var express = require('express');
var uuidv4 = require('uuid/v4');
var app = express();
var Minio = require('minio');

var s3Client = new Minio.Client({
    secure: true,
    endPoint: 'play.minio.io',
    port: 9000,
    accessKey: 'Q3AM3UQ867SPQQA43P2F',
    secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
});

const bucket = 'xxxx';
const port = 7500;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get(/\/uploads\/(.*)/, function (req, res) {
    return s3Client.presignedGetObject(bucket, req.params[0], 24 * 60 * 60, function (err, presignedUrl) {
        if (err) return console.log(err);
        res.redirect(presignedUrl);
    })
});

app.get('/s3/sign', function (req, res) {
    const filename = uuidv4() + "_" + req.query.objectName;
    s3Client.presignedPutObject(bucket, filename, 24 * 60 * 60, function (err, presignedUrl) {
        if (err) return console.log(err);
        res.json({
            signedUrl: presignedUrl,
            publicUrl: '/s3/uploads/' + filename,
            filename: filename,
        });
    })
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
