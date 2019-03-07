import {
  BaseComponent,
  Ioc
} from "shadow-nucleus";

import * as _hapi  from "hapi"  ;
import * as _nes   from "nes"   ;
import * as _inert from "inert" ;
import nes = require("nes");
import { IWebSocketService } from "./packages/websocket/back/IWebSocketService";

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

 type TServices = {
  websocket : IWebSocketService ;
  hapi      : typeof _hapi      ;
  inert     : typeof _inert     ;
 }

@Ioc({
  websocket : ["websocket" ,"com.nucleus"] ,
  hapi      : ["hapi"      ,"com.nucleus"] ,
  inert     : ["inert"     ,"com.nucleus"]
})
export default class extends BaseComponent {
  cmpId   = "Server"; // set the main id
  cmpName = "com.nucleus.ui"; // set teh main component name

  constructor(private services: TServices) {
    super();
  }

  async startServer() {
    const {websocket, hapi, inert} = this.services;

    const server = (hapi as any).server({
      port: 8080
    }) as _hapi.Server;

    const start = async () => {
      await server.register(inert);
      await server.register(websocket.getHapiPluginregistrationManifest());

      server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '../',
                listing: true
            }
        }
      });
    
      await server.start();
      console.log('Server running at:', server.info.uri);
    };
  
  start();
  }
}