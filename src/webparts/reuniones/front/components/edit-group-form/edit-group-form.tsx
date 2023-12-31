
import * as React from 'react';

import { useParams } from "react-router-dom";
import { IGrupos } from '../../../interfaces/IGrupos';
interface RouteParams {
    codigo: string; // Cambia el tipo según el tipo real de tu parámetro
  }

import { GroupForm } from '../group-form/group-form';
import { GroupFunctions } from '../../../functions/GroupFunctions';
import type { WebPartContext } from "@microsoft/sp-webpart-base";
import { Functions } from '../../../utils/functions';
interface GroupFormProps {

    context?: WebPartContext;
  
}


export default function GroupFormEdit ({context }: GroupFormProps){

    

    const { codigo } = useParams<RouteParams>();
    const [group,setGroup] = React.useState <IGrupos>();
    const [haveReadPerms,setHaveReadPerms] = React.useState(true)
    React.useEffect(() => {

        setHaveReadPerms(Functions.checkFullControlPermission(context))
        const test = async () => {

            const item= await GroupFunctions.getGroupsById(Number(codigo))
            
            setGroup(item)
            
        }
        
        test().then((item) => item).catch(console.error)
    },[])
    return (


        <div>
            
            {/* aqui llamo al componente de listado pasando el objeto del item que ha seleccionado */}
            {
                haveReadPerms === true ? <GroupForm grupo={group} context={context} codigo={codigo}></GroupForm>: <GroupForm context={context}></GroupForm> 
                
            }
            
        </div>


    ) 


}


