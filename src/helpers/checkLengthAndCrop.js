
const checkAndCrop = (string, maxlimt, storinglength, ) => {
    if (string !== undefined){
        if(string.length > maxlimt){
            string = string.slice(0,storinglength)
            return string
        }
        return string
    }
    return undefined
}

export  { checkAndCrop };