
const {ExifImage} = require("exif")

function getExif(imagePath) {
    return new Promise(function (resolve, reject) {
        //mandatory because callback function
        try {
            new ExifImage({ image: imagePath }, function (error, exifData) {
                if (error) {
                    resolve(null); //no exif
                } else {
                    resolve(exifData);
                }
            });
        } catch (error) {
            console.error("Can't read EXIF data");
            reject("EXIF Error");
        }
    });
}
module.exports = {getExif}