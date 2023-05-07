
class file{
    constructor(name){
        let extension_re = "(.*)(\\..*)"
        let match = name.match(extension_re)
        
        this.fullName = name
        this.nameNoExtension = match[1]
        this.extension = match[2]
    }
}


module.exports = {file}