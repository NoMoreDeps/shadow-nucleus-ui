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
import { CSSProperties } from "jss/css";

const styles = {
  root: {
    display       : "flex"   ,
    flexGrow      : 1        ,
    flexDirection : "row"    ,
    alignItems    : "strech" ,
    justifyContent: "flex-start"
  },
  paper: {
    textAlign: 'center'
  }
} as { [idex: string] : React.CSSProperties};

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
    const React    = await api.Service.getService<typeof _React>("react", "com.nucleus");
    const ReactDOM = await api.Service.getService<typeof _ReactDOM>("react-dom", "com.nucleus");
    const M = await api.Service.getService<typeof _M>("material-ui/core","com.nucleus");

    const entryPoint = document.querySelector("#nucleus-app");

    const {Grid, Paper, AppBar, Toolbar, Typography, Button, CssBaseline, Drawer, Divider, List, ListItem, ListItemText, Hidden} = M;

    const appBar = <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" style={{flexGrow:1}}>
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>;

      const drawer = <Hidden xsDown>
          <Paper style={{minWidth:250, maxWidth:250, flex:1, top:0, bottom:0, overflow:"auto"}}>
          <div  />
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Hidden>;



    ReactDOM.render((
      <React.Fragment>
        <CssBaseline />
        { appBar }
        <div style={{...styles.root}}>
          { drawer }
            <Grid container style={{margin:5}}>
              <Grid item>Hello</Grid>
            </Grid>
        </div>
      </React.Fragment>
      ), entryPoint);
  }
}

connect(ModuleEntryPoint);