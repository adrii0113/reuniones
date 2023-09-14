
import * as React from "react"
import { IGrupos } from "../../../interfaces/IGrupos"
import { GroupServices } from "../../../services/GroupServices";
import { Link } from "react-router-dom";




export default function GroupList (){

    

// Ahora puedes usar updatedUrl para la navegación


    const [groups,setGroups] = React.useState <IGrupos[]>([]);


    React.useEffect(()=>{

        GroupServices.getGroupsFromList().then(setGroups).catch(console.error);
    },[])
        return(

            <ul>
            {groups.map(({ denominacion, ID }) => (
              <li key={ID}>
                <Link to={`/edit/${ID}`}>{denominacion}</Link>
              </li>
            ))}
          </ul>


        )

}