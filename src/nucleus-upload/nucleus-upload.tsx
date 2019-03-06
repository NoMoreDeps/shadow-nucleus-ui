import {
  IApi,
  IModuleEntryPoint,
  UtilConstant,
  UtilEnv,
  connect
} from "shadow-nucleus";

import * as _React from "react";
import * as _ReactDOM from "react-dom";
import * as _M from "@material-ui/core";
import { IWebSocketService } from "./packages/websocket/front/IWebSocketService";
import {IFileStreamer} from "./packages/upload/front/IFileStreamer";
import {IUploadService} from "./packages/upload/front/IUploadService";


class ModuleEntryPoint implements IModuleEntryPoint {
  constructor() {

  }

  async entryPoint(api: IApi): Promise<void> {
    const React    = await api.Service.getService<typeof _React>("react", "com.nucleus");
    const ReactDOM = await api.Service.getService<typeof _ReactDOM>("react-dom", "com.nucleus");
    const M = await api.Service.getService<typeof _M>("material-ui/core","com.nucleus");
    const websocket = await api.Service.getService<IWebSocketService>("websocket","com.nucleus");
    const IFileStreamer = await api.Service.getService<IFileStreamer>("filestreamer","com.nucleus");
    const IUploadService = await api.Service.getService<IUploadService>("upload","com.nucleus");

    const {Grid, Paper, AppBar, Toolbar, Typography, Button, CssBaseline, Drawer, Divider, List, ListItem, ListItemText, Hidden, LinearProgress, Snackbar} = M;


    type AppState = {
      name: string;
      size: number;
      pct: number;
      open:boolean;
    }

    class App extends React.Component<{}, AppState>{
      constructor(props: any) {
        super(props);
        this.state = {
          name: "",
          pct:0,
          size:0,
          open:false
        }
      }
    
      render() {
        return <React.Fragment>
          <input
              style={{ display: 'none' }}
              id="raised-button-file"
              onChange={(evt) => {
                (async () => {

                  if (evt && evt.target && evt.target.files) {
                    const fs = new IFileStreamer(evt.target.files[0]);

                    this.setState({
                      name: fs.name,
                      size: evt.target.files[0].size,
                      pct:0
                    })
                    
                    const guid = await IUploadService.openSession({name: fs.name, size: evt.target.files[0].size});

                    while(!fs.isEndOfFile()) {
                      const array = await fs.readAsArray(1024*1024*3);
                      await IUploadService.sendChunk(guid, array);
                      
                        setTimeout(() => {
                          this.setState({
                            pct: this.state.pct + array.length
                          });
                        },0)
                      
                    }

                    await IUploadService.closeSession(guid);
                    setTimeout(() => {
                      this.setState({open: true})
                    }, 700); 
                    setTimeout(() => {
                      this.setState({open: false})
                    }, 3000); 
                  }
                })();
              }}
              type="file"
            />
            <div style={{width: 400}}>
              <Typography>
                Filename : {this.state.name}
                <hr />
                File Size : {this.state.size}
                <hr />
                Current data processed : {this.state.pct}
                <hr />
                <LinearProgress variant="determinate"  value={this.state.pct === 0 ? 0 : ((100 / this.state.size) * this.state.pct) >> 0} style={{height:30}}/>
              </Typography>
                <hr />
              <label htmlFor="raised-button-file">
                <Button variant="raised" component="span" >
                  Upload
                </Button>
              </label> 
            </div>
            <Snackbar
          anchorOrigin={{ vertical:"top", horizontal:"right" }}
          open={this.state.open}
          onClose={() => this.setState({open:false})}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Upload of {this.state.name} is completed.</span>}
        />
        </React.Fragment>
      }
    }

    await api.Service.registerService("ui.upload", "com.nucleus.components", {
      serviceDefinition: App
    })
  }
}

connect(ModuleEntryPoint);