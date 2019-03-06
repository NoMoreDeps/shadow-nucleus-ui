import {
  IApi,
  IModuleEntryPoint,
  UtilConstant,
  UtilEnv,
  connect
} from "shadow-nucleus";

import Server from "./Server";

class ModuleEntryPoint implements IModuleEntryPoint {

  async entryPoint(api: IApi): Promise<void> {
    const server = api.Service.activateService<Server>(Server);
    
    await server.startServer();
  }
}

connect(ModuleEntryPoint);