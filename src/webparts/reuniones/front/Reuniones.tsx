import * as React from "react";
// import type { WebPartContext } from "@microsoft/sp-webpart-base";


import {HashRouter, Route, Switch} from "react-router-dom"


import { Stack,StackItem } from "office-ui-fabric-react";


  import { GroupFormProps } from "./components/group-form/group-form";
  import GroupFormEdit from './components/edit-group-form/edit-group-form'
  // import GroupList from "./components/group-list/group-list";
  import { GroupForm } from "./components/group-form/group-form";
  import GroupDetailList from "./components/group-detail-list/group-detail-list";


// export interface IContextProps {
//   context?: WebPartContext;
// }
// import type { IList } from "@pnp/sp/lists";

// import { getSP } from "../../../pnp-js-config";
// import { IReunionesProps } from "../components/IReunionesProps";
import "@pnp/sp/fields";
import Spa from './../comp1/comp1'
// import { SectorFunctions } from "../functions/SectorFunction";
// const SPContext = React.createContext(null);
import "@pnp/sp/lists";
// import { SectorFunctions } from "../functions/SectorFunction";
// import type { IGrupos } from "../interfaces/IGrupos";
// import { GroupFunctions } from "../functions/GroupFunctions";
export default function Reuniones({context}: GroupFormProps) {

  
      // const getList =  getSP().web.lists.getById('296e7a8d-7bf8-4173-903d-a6c2c348fa4b')();

   

    // console.log(context.pageContext)
    // console.log(this.context.pageContext)
    // console.log(getList.then(list => console.log(list)));
    // const [selectedFile, setSelectedFile] = React.useState<File|null >();
    // const [newItemFormItem] = React.useState<IGrupos>({
    //   // Default object state
    //   Title:"uuuuuuuuuuuuuuuuuuuvvvvvvvvsadsavv",
    //   codigo:38901231892,
    //   denominacion:'dasdawdwad',
    //   TipoGrupo: '',
    //   descripcion:'',
    //   // Estado:true,
    //   sectorAsociado:"Transporte",

    //   fechaDeFinalizacion:new Date().toISOString(),
    //   fechaDeCreacion:new Date().toISOString(),
    //   defaultValues: true,
    //   ID:-1,
    //   Pais:{TermGuid:'23709398-1ede-4a81-934c-e9bc924b7aa7',Label:'Francia',WssId:-1},
    //   Ciudad:{TermGuid:'f4ad3208-87a3-4613-8a81-796dca92492e',Label:"Madrid",WssId:-1},
    //   // adjuntos:selectedFile
      
  
    // });
    
    // const tes = async () => {

    //   // newItemFormItem.adjuntos=selectedFile
    //   console.log(await getList)
    //   console.log(await SectorFunctions.getSectors())
      
      
    // }

    // tes().then((items) => console.log(items)).catch(console.error)

    // // React.useEffect(()=>{

      

    //   // console.log(selectedFile?.)
      
    //   console.log(selectedFile)
    //   // newItemFormItem.adjuntos=selectedFile
    //   console.log(newItemFormItem)
    //   tes().then((items)=>console.log(items)).catch(console.error)

    // },[selectedFile])


    // React.useEffect(()=>{

    //   const get = async () => {


    //     console.log(await SectorFunctions.getSectors())
    //   }

    //   get().then((items)=>console.log(items)).catch(console.error)
    // },[])
    
    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   const file = event.target.files && event.target.files[0];
    //   setSelectedFile(file);
    //   console.log(selectedFile)
    //   tes().then((item) => console.log(item)).catch(console.error)
    //   // parece ser que el setselected file no va no se porq
    // };
    
  //   const addNewGroups = async () => {
  //     // const list = await sp.web.lists.getByTitle("My Lookup List")();
  //     // const field = await getList().fields.addLookup("My Field", { LookupListId: list.data.Id, LookupFieldName: "Title" });
  //     const getList = (): IList => getSP().web.lists.getById('296e7a8d-7bf8-4173-903d-a6c2c348fa4b');
      
  //     const newItems = await getList().items.add({
  //         Title:'adadasda',
       
  //         // codigo:,
  //         sectorAsociadoId:1,
  //         denominacion:'daidjaiwda',
  //         descripcion:'dawidjawida',
  //         fechaDeCreacion:new Date().toISOString(),
  //         fechaDeFinalizacion:new Date().toISOString(),
  //         TipoGrupo:'Grupo estable',
         
  //         Estado:true,
  //         Pais:{TermGuid:'23709398-1ede-4a81-934c-e9bc924b7aa7',Label:'Francia',WssId:-1},
  //         Ciudad:{TermGuid:'f4ad3208-87a3-4613-8a81-796dca92492e',Label:"Madrid",WssId:-1},
  //         // Ambito:
  //     })
  
      
  //     console.log(newItems)
  //     return newItems
  
  // }

  //   addNewGroups().then((item) => console.log(item)).catch(console.error)


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
            component={()=><GroupFormEdit context={context}/>}
            >
            
            </Route>
            {/* CREATE NEW GROUP ROUTE */}
            <Route
            
            path='/newgroup'
            exact={true}
            component={()=><GroupForm context={context}/>}
            >
            
            </Route>

            <Route
            
            path='/list'
            exact={true}
            component={()=><GroupDetailList/>}
            
            >
            
            </Route>
          </Switch>
        </StackItem>
      </Stack>
      
    </HashRouter>
    // <GroupDetailList></GroupDetailList>
    // <div>
      
    // </div>
    )


}

