import {fileURLToPath} from "url";
import {dirname} from "path";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidHash = (password, hash) => bcrypt.compareSync(password, hash)
export default __dirname