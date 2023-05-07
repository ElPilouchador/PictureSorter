const path = require("path");
const _exif = require("./exif_utils");
class NameInfo {
    constructor() {
        this.fullName ;
        this.nameNoExtension;
        this.extension ;
    }
    init(fileName){
       let pathObject = path.parse(fileName)
       this.fullName = pathObject.base
       this.nameNoExtension = pathObject.name
       this.extension = pathObject.ext
    }
}

function createNameInfo(fileName){
    let nm = new NameInfo
    nm.init(fileName)
    return nm
}

class Image {
    constructor() {
        this.fullPath;
        this.fileInfo;
        this.currentDir;
        this.date;
        this.month;
        this.year;
    }
    async init(pathToFile) {
        let pathObject = path.parse(pathToFile);
        
        this.fullPath = pathToFile;
        
        this.nameInfo = createNameInfo(pathObject.base);
        this.currentDir = pathObject.dir;
        this.date = await _exif.getExifFormattedDate(pathToFile);

        if (this.date !== null) {
            this.month = this.date.getMonth();
            this.year = this.date.getFullYear();
        } else {
            this.month = null;
            this.year = null;
        }
    }
}

async function createImage(imagePath) {
    let img = new Image();
    await img.init(imagePath);
    return img;
}

module.exports = { createNameInfo, createImage };