
const {path} = require("path")
const {fs} = require("fs")
const fu = require("./file_utils")
const exif = require("./exif_utils")




function fileCheckUnicity(filename, destinationPath, existList) {
    let filePath = path.join(destinationPath, filename);
    if (fs.existsSync(filePath)) {

    } 
    else {
        return;
    }
}

async function sorter(originPath, destinationPath) {
    //create unknow dir
    // let unknowPath = path.join(destinationPath, "unknow");
    // createDir(unknowPath);
    // //parse origin folder
    // let filesList = recursiveFolderParser(originPath, []);
    // for (let file of filesList) {
    //     let exif = await getExif(file);
    //     if (exif == null) {
    //         void 0; //does nothing
    //     } else {
    //         let date = exif.exif.DateTimeOriginal;
    //         if (date == undefined) {
    //             //console.log(path.join(unknowPath, file));
    //         }
    //     }
    // }
}


async function main() {
    let errorText = "Attention mauvais chemin ou ce n'est pas un dossier\n";
    let originPathStr = await fu.getFolder("Indiquez votre dossier d'origine\n", errorText);
    //let destinationPathStr = await getFolder("Indiquez votre dossier de destination\n", errorText);
    //let test = "C:\\Users\\plren\\Documents\\Fax";
    sorter("./originFolder", "./destination");
}

main();
