import * as React from "react";
import type { WebPartContext } from "@microsoft/sp-webpart-base";

// import { BrowserRouter, Route, Link,createBrowserRouter,createRoutesFromElements } from "react-router-dom";

//   import { useActionData } from "react-router-dom";
// import GroupDetailList from './components/group-detail-list/group-detail-list'
import GroupList from "./components/group-list/group-list";

  // import {
  //   // createBrowserRouter,
  //   // createRoutesFromElements,
  //   // Form,
  //   // json,
  //   // Link,
  //   // Outlet,
  //   Route,
  //   Routes,
  //   // RouterProvider,
  //   // unstable_useBlocker as useBlocker,
  //   // useLocation,
  //   // Switch
  //   HashRouter as Router
  // } from "react-router-dom";
import {HashRouter, Route, Switch} from "react-router-dom"
//   import {
//     createHashRouter,
//     RouterProvider,
//   } from "react-router-dom";

import { Stack,StackItem } from "office-ui-fabric-react";

  // import { Route } from "react-router-dom";
  import { GroupForm } from "./components/group-form/group-form";
  import GroupFormEdit from './components/edit-group-form/edit-group-form'

// const Layout = () => {
//     return (
//       // <div>hola</div>

//       // <GroupDetailList></GroupDetailList>
//       // <GroupForm></GroupForm>
//       <GroupDetailList></GroupDetailList>
//     )
// }

// const ImportantForm = () => {
//     return (
//       // <div>hola</div>
//       // <GroupDetailList></GroupDetailList>
//       <GroupForm></GroupForm>
//     )
// }



export interface IContextProps {
  context?: WebPartContext;
}
  

// import { getSP } from "../../../pnp-js-config";
import { IReunionesProps } from "../components/IReunionesProps";

import Spa from './../comp1/comp1'
// const SPContext = React.createContext(null);
export default function Reuniones({context}: IReunionesProps) {


    // const getList =  getSP().web.lists.getById('296e7a8d-7bf8-4173-903d-a6c2c348fa4b').items();

    // const list = getSP().web.lists.getByTitle('Grupos').items();

    console.log(context.pageContext)
    // console.log(getList.then(list => console.log(list)));

    

    return (

    
    <HashRouter>
      <Stack>
      <Spa></Spa>
        <StackItem>
          <Switch>
            {/* DETAIL LIST ROUTE */}
            <Route
            
            path='/edit/:codigo'
            exact={true}
            component={()=><GroupFormEdit/>}
            >
            
            </Route>
            {/* CREATE NEW GROUP ROUTE */}
            <Route
            
            path='/newgroup'
            exact={true}
            component={()=><GroupForm/>}
            >
            
            </Route>

            <Route
            
            path='/list'
            exact={true}
            component={()=><GroupList/>}
            >
            
            </Route>
          </Switch>
        </StackItem>
      </Stack>
    </HashRouter>
    // <GroupDetailList></GroupDetailList>
    )


}