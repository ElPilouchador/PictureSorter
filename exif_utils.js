const { ExifImage } = require("exif");

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

async function getExifFormattedDate(imagePath) {
    let final_date = null;
    let re_date_str = "([0-9]{4}:[0-9]{2}:[0-9]{2}) ([0-9]{2}:[0-9]{2}:[0-9]{2})$";
    let re_date = new RegExp(re_date_str);
    let exif_data = await getExif(imagePath);
    if (exif_data !== null) {
        if (exif_data.exif.DateTimeOriginal !== undefined) {
            //exif_data.exif.DateTimeOriginal
            let match = exif_data.exif.DateTimeOriginal.match(re_date_str)
            let unformattedDate = match[1].replaceAll(":","-")
            final_date = new Date(Date.parse(unformattedDate))
        }
    }
    return final_date;
}
module.exports = { getExif, getExifFormattedDate };
