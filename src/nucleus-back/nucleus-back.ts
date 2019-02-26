import {
  IApi,
  IModuleEntryPoint,
  UtilConstant,
  UtilEnv,
  connect
} from "shadow-nucleus";

import Server from "./Server";

/**
 * If you want to use some constant as enum for your own events, you can declare them as following
 * The constantTree function will fill every string value with the recursiv path
 const constants = {
   SOME_KEY: "",
   SOME_OTHER_KEY: {
     SOME_NESTED_KEY:""
    }
  } 
  
  UtilConstant.constantTree(constants)
 */

class ModuleEntryPoint implements IModuleEntryPoint {
  constructor() {

  }

  async entryPoint(api: IApi): Promise<void> {
    const server = api.Service.activateService<Server>(Server);

    await server.startServer();
  }
}

connect(ModuleEntryPoint);