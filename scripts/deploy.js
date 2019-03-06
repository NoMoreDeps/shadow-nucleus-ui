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
tools_1.copySync("./nc-packages/modules/nucleus.web.js", "./dist/packages");
tools_1.copySync("./nc-packages/modules/nucleus.node.js", "./dist/packages");
tools_1.copySync("./dist/nucleus-ui", "./dist/packages/nucleus-ui");
tools_1.copySync("./dist/nucleus-upload", "./dist/packages/nucleus-upload");
tools_1.copySync("./dist/nucleus-back", "./dist/packages/nucleus-back");
tools_1.copySync("z:/shadow-nucleus-plugins/dist", "./dist/packages");
tools_1.copySync("./assets/modules.conf.node.json", "./dist/packages");
tools_1.copySync("./assets/modules.conf.web.json", "./dist/packages");
tools_1.copySync("./assets/index.html", "./dist");
createDir("./www");
tools_1.copySync("./dist/packages", "./www/packages");
tools_1.copySync("./dist/index.html", "./www");
