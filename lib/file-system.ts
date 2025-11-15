import { readFileSync } from "fs";

export const getStaticFileContent = async (path: string): Promise<string> => {
    const res = await fetch(path);
    return await res.text();
};