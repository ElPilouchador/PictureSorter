import readline from "readline";
import ExifImage from "exif";
import * as path from "node:path";
import * as fs from "node:fs";

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

function createDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}
async function askUser(text) {
    let test;
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));
    test = await prompt(text);
    rl.close();
    return test;
}

function testIsDir(pathStr) {
    let stats;
    try {
        stats = fs.statSync(pathStr);
    } catch (error) {
        return false;
    }
    return stats.isDirectory();
}

async function getFolder(questionText, errorText) {
    let pathValid = false;
    let pathStr;
    //let parsedPath;
    while (!pathValid) {
        pathStr = await askUser(questionText);
        pathValid = testIsDir(pathStr);
        if (!pathValid) {
            console.log(errorText);
        }
    }
    //if here the path seems to be correct
    //parsedPath = path.parse(pathStr);
    return pathStr;
}
function recursiveFolderParser(dirPath, filesArray) {
    fs.readdirSync(dirPath).forEach((File) => {
        let currentPath = path.join(dirPath, File);
        if (fs.statSync(currentPath).isDirectory()) {
            return recursiveFolderParser(currentPath, filesArray);
        } else {
            return filesArray.push(currentPath);
        }
    });
    return filesArray;
}

function fileCheckUnicity(filename, destinationPath, existList) {
    console.log(file);
    if (fs.existsSync(path.join(destinationPath, filename))) {
        //check if file exist in the array
        let file = existList.files.find((e) => e.name == filename);
        if (file == undefined) {
            //create object with index and return updated filename
        } else {
            //increment index and return filename
        }
    } else {
        return [filename, existList];
    }
}

async function sorter(originPath, destinationPath) {
    //create unknow dir
    let alreadyExistFiles = { files: [] };
    alreadyExistFiles.files.push({ name: "aaaaaa.jpg", index: 3 });
    fileCheckUnicity("aaa.jpg", "./", alreadyExistFiles);
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
    let originPathStr = await getFolder("Indiquez votre dossier d'origine\n", errorText);
    //let destinationPathStr = await getFolder("Indiquez votre dossier de destination\n", errorText);
    //let test = "C:\\Users\\plren\\Documents\\Fax";
    //sorter("./originFolder", "./destination");
}

main();
