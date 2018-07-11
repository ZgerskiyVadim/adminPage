import path from "path";
import config from "../../config";

export function sendIndexHtml(req, res) {
    res.sendFile(path.join(__dirname + config.errorPath));
}