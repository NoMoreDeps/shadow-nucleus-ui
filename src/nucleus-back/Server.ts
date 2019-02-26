import {
  BaseComponent,
  UtilEnv,
  UtilConstant
} from "shadow-nucleus";

import * as _hapi  from "hapi"  ;
import * as _nes   from "nes"   ;
import * as _inert from "inert" ;

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

export default class extends BaseComponent {
  cmpId   = "Server"; // set the main id
  cmpName = "com.nucleus.ui"; // set teh main component name

  constructor() {
    super();
  }

  async startServer() {
    const hapi   = await this.getService<typeof _hapi>("hapi", "com.nucleus")   ;
    const nes    = await this.getService<typeof _nes>("nes", "com.nucleus")     ;
    const inert  = await this.getService<typeof _inert>("inert", "com.nucleus") ;

    const server = (hapi as any).server({
      port: 8080
    }) as _hapi.Server;


    const start = async () => {
      await server.register(inert);
  
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