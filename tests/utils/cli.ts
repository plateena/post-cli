import { exec } from 'child_process'

export const cli = (cmd: string): Promise<string> => {
    return new Promise((resolve, _) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                resolve(error.message)
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}
