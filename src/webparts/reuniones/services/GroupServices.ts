
import { GroupFunctions } from "../functions/GroupFunctions"
// // funcion para ver todas las reuniones


// funcion para mostrar los grupos que hay en la lista de grupos


export const getGroupsFromList = () =>{

    const lista = GroupFunctions.getAllGroups();
    return lista

}


// const getGroupById = () =>{

//     const group = GroupFunctions.getGroupById

// }

// const getAllMeetings = () => {

//     const meetings = GroupFunctions.getGroupsById


//     return {meetings}
// }
// funcion para editar los grupos de reuniones


// funcion para crear gurpos de reuniones


export const GroupServices = {


    getGroupsFromList,
    // getGroupById

}