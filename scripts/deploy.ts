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
copySync("./nc-packages/modules/nc-logging", "./dist/packages/nc-logging")
copySync("./nc-packages/modules/nucleus.bootNode.js", "./dist/packages")
copySync("./nc-packages/modules/nucleus.bootWeb.js", "./dist/packages")
copySync("./assets/modules.conf.node.json", "./dist/modules.conf.node.json")
copySync("./assets/modules.conf.web.json", "./dist/modules.conf.web.json")

createDir("./www");
copySync("./dist/packages","./www/packages");
copySync("./dist/modules.conf.node.json","./www/modules.conf.node.json");
copySync("./dist/modules.conf.web.json","./www/modules.conf.web.json");
