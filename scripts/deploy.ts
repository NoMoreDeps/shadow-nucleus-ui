import { 
    copySync   ,
    execSync   ,
    existsSync ,
    mkDirSync  ,
    renameSync ,
    rmDirSync
} from "../nc-scripts/tools";

function createDir(path: string) {   
    if (!existsSync(path)) {
        mkDirSync(path);
    }
}

createDir("./dist");
createDir("./dist/packages");
copySync("./nc-packages/modules/nc-logging", "./dist/packages/nc-logging");
copySync("./nc-packages/modules/nucleus.bootNode.js", "./dist/packages");
copySync("./nc-packages/modules/nucleus.bootWeb.js", "./dist/packages");
copySync("./nc-packages/modules/nucleus.web.js", "./dist/packages");
copySync("./nc-packages/modules/nucleus.node.js", "./dist/packages");
copySync("./dist/nucleus-ui", "./dist/packages/nucleus-ui");
copySync("./dist/nucleus-upload", "./dist/packages/nucleus-upload");
copySync("./dist/nucleus-back", "./dist/packages/nucleus-back");

copySync("z:/shadow-nucleus-plugins/dist", "./dist/packages");

copySync("./assets/modules.conf.node.json", "./dist/packages");
copySync("./assets/modules.conf.web.json", "./dist/packages");
copySync("./assets/index.html", "./dist");

createDir("./www");
copySync("./dist/packages","./www/packages");
copySync("./dist/index.html","./www");
