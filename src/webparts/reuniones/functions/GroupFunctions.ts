

import { getSP } from "../../../pnp-js-config";
import type { IList } from "@pnp/sp/lists";
// import { IItemAddResult } from '@pnp/sp/presets/all';
import "@pnp/sp/fields";
import { IGrupos } from "../interfaces/IGrupos";


const getList = (): IList => getSP().web.lists.getById('296e7a8d-7bf8-4173-903d-a6c2c348fa4b');


// interface ArchivoAdjunto {
//     nombre: string;
//     contenido: ArrayBuffer;
// }
const getGroupsById = async (groupId : number) => {


    const group: IGrupos = await getList().items.getById(groupId).select('*')();

    // const {Title,codigo,sector,denominacion,descripcion,fechaDeCreacion,TipoGrupo,Estado,defaultValues,adjuntos} = group

    const item: IGrupos= {

        Title:group.Title,
        codigo:group.codigo,
        ID:group.ID,
        // sector: group.sector,
        denominacion: group.denominacion,
        descripcion: group.descripcion,
        fechaDeCreacion: group.fechaDeCreacion,
        // Ambito: group.Ambito,
        TipoGrupo: group.TipoGrupo,
        // ubicacion: group.ubicacion,
        Estado: group.Estado,
        // Pais: group.Pais,
        // Ciudad: group?.Ciudad.Label
        defaultValues: true,
        adjuntos:group.adjuntos
    }
    return item
}


const getAllGroups = async (): Promise<IGrupos[]> => {

    const groups: IGrupos[] = await getList().items()
    return groups.map((group) => ({
        Title: group.Title,
        // id: group.id,
        codigo:group.codigo,
        ID:group.ID,
        // sector: group.sector,
        denominacion: group.denominacion,
        descripcion: group.descripcion,
        fechaDeCreacion: group.fechaDeCreacion,
        // Ambito: group.Ambito,
        TipoGrupo: group.TipoGrupo,
        // ubicacion: group.ubicacion,
        Estado: group.Estado,
        // Pais: group.Pais,
        // Ciudad: group?.Ciudad.Label
        defaultValues: true,
        adjuntos:group.adjuntos

      }))
  
}





const addNewGroups = async (item: IGrupos) => {

    const {Title,codigo,denominacion,TipoGrupo,Estado,descripcion,fechaDeCreacion} = item;
    const newItems = await getList().items.add({
        Title:Title,
        // id:id,
        codigo:codigo,
        // sector:sector.Denominacion,
        denominacion:denominacion,
        descripcion:descripcion,
        fechaDeCreacion:fechaDeCreacion,
        TipoGrupo:TipoGrupo,
        // ubicacion:ubicacion,
        Estado:Estado
    
    
    });


    return newItems

}


// const subirArchivoAdjunto = async ( listaNombre: string, elementoId: number, archivo: ArchivoAdjunto) => {
//     try {
//         // const lista = sp.web.lists.getByTitle(listaNombre);
//         // const archivoAdjunto = await getSP().web.lists.getById('296e7a8d-7bf8-4173-903d-a6c2c348fa4b').items.getById(Number(elementoId)).add;
//         const item: IItemAddResult = await getList().items.getById(elementoId).attachmentFiles.add(archivo.name, archivo.content);
//         // console.log('Archivo adjunto subido con éxito:', archivoAdjunto);
//     } catch (error) {
//         console.error('Error al subir el archivo adjunto:', error);
//     }
// };
 




export const GroupFunctions = {


    getGroupsById,
    getAllGroups,
    addNewGroups

}