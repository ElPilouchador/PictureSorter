const path = require("path");
const fs = require("fs");
const fu = require("./fs_utils");
const cl = require("./classes");

const UNKNOW_FOLDER_NAME = "unknow"

function renamer(nameInfo) {
    let newFilename = nameInfo.fullName;
    let correct_name = "(.*)_([0-9]*)$";
    let correct_name_re = new RegExp(correct_name);
    
    if (correct_name_re.test(nameInfo.nameNoExtension)) {
        //if here filename look like xxxx_1234567890
        let match = nameInfo.nameNoExtension.match(correct_name);
        let nbr = match[2];
        nbr++;
        //increment the number at end
        newFilename = match[1] + "_" + nbr + nameInfo.extension;
    } else {
        //if nameInfo doesn't match regex we just add _1 at the end
        newFilename = nameInfo.nameNoExtension + "_1" + nameInfo.extension;
        
    }
    
    return cl.createNameInfo(newFilename);
}

async function moveFileSafe(Image, destinationFolder) {
    //will move Image to destinationFolder by ensuring no deletion (i.e. renaming if already exisiting)
    let tempNameInfo = Image.nameInfo
    let tempPath = path.join(destinationFolder,tempNameInfo.fullName)
    let correct_destination = false;
    
    while (!correct_destination) {
        if( fs.existsSync(tempPath)){
            //file already exist
            tempNameInfo = renamer(tempNameInfo)

            tempPath = path.join(destinationFolder,tempNameInfo.fullName)
        }
        else{
            let newPath = path.join(destinationFolder,tempNameInfo.fullName)
 
            fs.renameSync(Image.fullPath,newPath)
            correct_destination = true
            
        }
        
        
    }
}

async function copyFileSafe(Image, destinationFolder) {
    //will copy Image to destinationFolder by ensuring no deletion (i.e. renaming if already exisiting)
    let tempNameInfo = Image.nameInfo
    let tempPath = path.join(destinationFolder,tempNameInfo.fullName)
    let correct_destination = false;
    
    while (!correct_destination) {
        if( fs.existsSync(tempPath)){
            //file already exist
            tempNameInfo = renamer(tempNameInfo)

            tempPath = path.join(destinationFolder,tempNameInfo.fullName)
        }
        else{
            let newPath = path.join(destinationFolder,tempNameInfo.fullName)
 
            fs.copyFileSync(Image.fullPath,newPath)
            correct_destination = true
            
        }
        
        
    }
}


async function sorter(originPath, destinationPath) {
    //start by creating an unknow folder
    let unknowPath = path.join(destinationPath, UNKNOW_FOLDER_NAME);
    fu.createDir(unknowPath);


    // create unknow dir
    // parse origin folder
    let filesList = fu.recursiveFolderParser(originPath, []);
    

    for (let file of filesList) {
        let img = await cl.createImage(file)
        if(img.date == null){
            console.log(file);
            console.log("will be moved to unk");
            moveFileSafe(img,unknowPath)
        }
        else{
            console.log(file);
            
            let futurePath = path.join(destinationPath,img.year.toString(),img.month.toString())
            fu.createDir(futurePath)
            moveFileSafe(img,futurePath)
        }
        console.log("\n");




        
    }
}


module.exports = {sorter}