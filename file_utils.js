const {path} = require("path")
const {fs} = require("fs")
const std = require("./std_helpers")
function createDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
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
        pathStr = await std.askUser(questionText);
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
module.exports = {createDir,getFolder,recursiveFolderParser,testIsDir}