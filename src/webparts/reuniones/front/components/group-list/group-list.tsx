
import * as React from "react"
import { IGrupos } from "../../../interfaces/IGrupos"
import { GroupServices } from "../../../services/GroupServices";
import { Link } from "react-router-dom";
// import { GroupFunctions } from "../../../functions/GroupFunctions";
// import { URLSearchParams } from 'url';

// test






export default function GroupList (){

    

// Ahora puedes usar updatedUrl para la navegación


    const [groups,setGroups] = React.useState <IGrupos[]>([]);


    React.useEffect(()=>{

        GroupServices.getGroupsFromList().then(setGroups).catch(console.error);
        // const searchParams = new URLSearchParams();
        // console.log(searchParams)

      //   function updateQueryStringParameter(url: string, key: string, value: string): string {
      //       const urlSearchParams = new URLSearchParams(url);
          
      //       // Establece o actualiza el valor del parámetro
      //       urlSearchParams.set(key, value);
          
      //       // Devuelve la URL actualizada con los parámetros de la cadena de consulta
      //       return `${url.split('?')[0]}?${urlSearchParams.toString()}`;
      //     }
          
      //   const currentUrl: string = window.location.href; // Obtén la URL actual
      //   const updatedUrl: string = updateQueryStringParameter(currentUrl, 'codigo', '1');

      //   console.log(updatedUrl)

      //  const test = async() => {
      //   const gr = await GroupFunctions.getGroupByName('nose')
      //   console.log(gr)
      //  }

      //  test().then((news) =>{console.log(news)}).catch((error) =>console.log(error))
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