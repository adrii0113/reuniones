
import * as React from "react"
import { IGrupos } from "../../../interfaces/IGrupos"
import { GroupServices } from "../../../services/GroupServices";
import { Link } from "react-router-dom";
// import { URLSearchParams } from 'url';

// test






export default function GroupList (){

    

// Ahora puedes usar updatedUrl para la navegación


    const [groups,setGroups] = React.useState <IGrupos[]>([]);


    React.useEffect(()=>{

        GroupServices.getGroupsFromList().then(setGroups).catch(console.error);
        // const searchParams = new URLSearchParams();
        // console.log(searchParams)

        function updateQueryStringParameter(url: string, key: string, value: string): string {
            const urlSearchParams = new URLSearchParams(url);
          
            // Establece o actualiza el valor del parámetro
            urlSearchParams.set(key, value);
          
            // Devuelve la URL actualizada con los parámetros de la cadena de consulta
            return `${url.split('?')[0]}?${urlSearchParams.toString()}`;
          }
          
        const currentUrl: string = window.location.href; // Obtén la URL actual
        const updatedUrl: string = updateQueryStringParameter(currentUrl, 'codigo', '1');

        console.log(updatedUrl)

       
    },[])
        return(

            <ul>
            {groups.map(({ Title, ID }) => (
              <li key={ID}>
                <Link to={`/edit/${ID}`}>{Title}</Link>
              </li>
            ))}
          </ul>


        )

}