const sort = require("./sorting_utils")
const fu = require("./fs_utils");




async function main() {
    let errorText = "Attention mauvais chemin ou ce n'est pas un dossier\n";
    let originPathStr = await fu.getFolder("Indiquez votre dossier d'origine\n", errorText);
    console.log("Demarrage \n \n")
    //let destinationPathStr = await getFolder("Indiquez votre dossier de destination\n", errorText);
    //let test = "C:\\Users\\plren\\Documents\\Fax";
    

    sort.sorter("./originFolder", "./destination");
}

main();
