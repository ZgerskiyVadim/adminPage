import path from "path";
import config from "../../config";

export function sendErrorHtml(req, res) {
    res.sendFile(path.join(__dirname + config.errorPath));
}