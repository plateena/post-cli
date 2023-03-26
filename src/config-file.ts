import fs from "fs"

export const loadConfigFile = (path: string) => {
    let fileExist = checkFileExist(path);
    if (!fileExist) {
        return false;
    }
}

const checkFileExist = (path: string) => {
    try {
        if (fs.existsSync(path)) {
            return true;
        } else {
            console.error(`File ${path} not exist. Please provide a valid file path.`);
            return false

        }
    } catch (error) {
        console.error(error);
        return false;

    }
}

export default { loadConfigFile }
