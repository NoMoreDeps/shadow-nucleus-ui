import {
  IApi,
  IModuleEntryPoint,
  UtilConstant,
  UtilEnv,
  connect
} from "shadow-nucleus";

import * as _React from "react";
import * as _ReactDOM from "react-dom";

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
    const React = await api.Service.getService<typeof _React>("react", "com.nucleus");
    const ReactDOM = await api.Service.getService<typeof _ReactDOM>("react-dom", "com.nucleus");

    const entryPoint = document.querySelector("#nucleus-app");

    ReactDOM.render(<div>Hello kitty</div>, entryPoint);
  }
}

connect(ModuleEntryPoint);