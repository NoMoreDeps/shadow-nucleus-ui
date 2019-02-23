"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../nc-scripts/tools");
function createDir(path) {
    if (!tools_1.existsSync(path)) {
        tools_1.mkDirSync(path);
    }
}
createDir("./dist");
createDir("./dist/packages");
tools_1.copySync("./nc-packages/modules/nc-logging", "./dist/packages/nc-logging");
tools_1.copySync("./nc-packages/modules/nucleus.bootNode.js", "./dist/packages");
tools_1.copySync("./nc-packages/modules/nucleus.bootWeb.js", "./dist/packages");
tools_1.copySync("./assets/modules.conf.node.json", "./dist/modules.conf.node.json");
tools_1.copySync("./assets/modules.conf.web.json", "./dist/modules.conf.web.json");
createDir("./www");
tools_1.copySync("./dist/packages", "./www/packages");
