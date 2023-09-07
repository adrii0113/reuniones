

import { getSP } from "../../../pnp-js-config";
import type { IList } from "@pnp/sp/lists";
// import { IItemAddResult } from '@pnp/sp/presets/all';

import "@pnp/sp/fields";
import { IGrupos } from "../interfaces/IGrupos";

import type { IPickerTerms } from "@pnp/spfx-controls-react";
// import { Term } from "@pnp/sp/taxonomy";
// import { Functions } from "../utils/functions";
const getList = (): IList => getSP().web.lists.getById('296e7a8d-7bf8-4173-903d-a6c2c348fa4b');
import { IItem } from "@pnp/sp/items/types";
import "@pnp/sp/attachments";

// interface ArchivoAdjunto {
//     nombre: string;
//     contenido: ArrayBuffer;
// }

export interface ITaxField {
    Label: string;
    TermGuid: string;
    WssId: number;
  }

const getGroupsById = async (groupId : number) => {


    const group: IGrupos = await getList().items.getById(groupId).select('*')();

    // const {Title,codigo,sector,denominacion,descripcion,fechaDeCreacion,TipoGrupo,Estado,defaultValues,adjuntos} = group

    const item: IGrupos= {

        Title:group.Title,
        codigo:group.codigo,
        ID:group.ID,
        sectorAsociadoId: group.sectorAsociadoId,
        denominacion: group.denominacion,
        descripcion: group.descripcion,
        fechaDeCreacion: group.fechaDeCreacion,
        fechaDeFinalizacion:group.fechaDeFinalizacion,
        Ambito: group.Ambito,
        TipoGrupo: group.TipoGrupo,
       
        Estado: group.Estado,
        Pais: group.Pais,
        Ciudad: group?.Ciudad,
        defaultValues: true,
      
        
    }
    return item
}

const getGroupForAttachment = async (groupId : number, file: File) => {


    const group: IItem = await getList().items.getById(groupId)();

    await getList().items.getById(groupId).attachmentFiles.add(file.name,(await file.text()).toString())
    return group
}



const getAllGroups = async (): Promise<IGrupos[]> => {

    const groups: IGrupos[] = await getList().items()
    return groups.map((group) => ({
        Title: group.Title,
        // id: group.id,
        codigo:group.codigo,
        ID:group.ID,
        sectorAsociadoId: group.sectorAsociadoId,
        denominacion: group.denominacion,
        descripcion: group.descripcion,
        fechaDeCreacion: group.fechaDeCreacion,
        fechaDeFinalizacion: group.fechaDeFinalizacion,
        // Ambito: group.Ambito,
        TipoGrupo: group.TipoGrupo,
        
        Estado: group.Estado,
        Pais: group.Pais,
        Ciudad: group.Ciudad,
        Ambito:group.Ambito,
        defaultValues: true,
       
        

      }))
  
}

const getGroupByName = async (name: string) => {
    // comprobar que el grupo que se esta intentando crear ya existe
    const group : IGrupos[] =  await getList().items.select('*')()
    const result = group.filter((item) => item.denominacion === name)

    return result.length

  
}


const getGroupByNames = async (name: string) => {
    // comprobar que el grupo que se esta intentando crear ya existe
    const group : IGrupos[] =  await getList().items.select('*')()
    const result = group.filter((item) => item.Title === name)

    return result

  
}




const addNewGroups = async (item: IGrupos) => {
    // const list = await sp.web.lists.getByTitle("My Lookup List")();
    // const field = await getList().fields.addLookup("My Field", { LookupListId: list.data.Id, LookupFieldName: "Title" });


    const {Title,codigo,denominacion,descripcion,fechaDeCreacion,fechaDeFinalizacion,Pais,Ciudad,sectorAsociadoId,Ambito,Estado,TipoGrupo} = item;
    const newItems = await getList().items.add({
        Title:Title,
        // id:id,
        codigo:codigo,
        sectorAsociadoId:sectorAsociadoId,
        denominacion:denominacion,
        descripcion:descripcion,
        fechaDeCreacion:fechaDeCreacion,
        fechaDeFinalizacion:fechaDeFinalizacion,
        TipoGrupo:TipoGrupo,
        // ubicacion:ubicacion,
        Estado:Estado,
        Pais:Pais,
        Ciudad:Ciudad,
        Ambito:Ambito
    })

    
    console.log(newItems)
    return newItems

}


// funcion para comprobar si el item que se acaba de editar no ha sido editado por otro antes
const checkItemModified = async (itemId: number, currentUser: string) => {

    let modificado = false;

    // const currenUser = await  getSP().web.getContextInfo().then()
    // console.log(currenUser)

    const item = await getList().items.getById(itemId).select("Editor/Title").expand("Editor")()

    // si es false el item no esta modificado por otro usuario que no sea el acutal
    item.Editor.Title === currentUser ? modificado = false : modificado = true

    return modificado
}

// funcion para actualizar un elemento de la lsita


const updateGroup = async (itemId: number, newGroup:IGrupos) => {


    
    try {
        
        await getList().items.getById(itemId).update(newGroup)
    } catch (error) {
        console.log(error)
    }


}


export const getTaxField = (item: any, key: keyof typeof item): ITaxField => {
    const { TermGuid, WssId } = item[key];
    const taxAll: any[] = item.TaxCatchAll ?? [];
    const Label = taxAll.find((tax) => tax.ID === WssId)?.Term ?? "";
    return { Label, TermGuid, WssId };
  };
  
  export const buildTaxField = ([{ name, key }]: IPickerTerms): ITaxField => ({
    Label: name,
    TermGuid: key,
    WssId: -1,
  });



  const getTaxonomyTermsChildren = async (groupId: string, termId: string)=> {

    // console.log((await getSP().termStore.groups.getById(groupId).sets.getById(termId).children()))
    const terms = (await getSP().termStore.groups.getById(groupId).sets.getById(termId).children())
    console.log(await getSP().termStore.groups.getById(groupId).sets.getById(termId).children())
    
    // const newItem = await getList().items.add({
    //     Title: "New Item Title",
    //     TaxonomyFieldInternalName: {
    //       __metadata: { type: "SP.Taxonomy.TaxonomyFieldValue" },
    //       Label: this.state.selectedTerm.name,
    //       TermGuid: this.state.selectedTerm.key,
    //       WssId: -1 // Dejar en -1
    //     }
    //   });
    return terms
  }



  const getChoicesFromChoiceField = async  () => {

    const list =  getSP().web.lists.getByTitle("Grupos");
    const fields = await list.fields.getByInternalNameOrTitle("TipoGrupo")()
    // console.log(fields.Choices)

    
    return fields
  }


//   const getGroupTypeChoices = () => {

//     // AQUI HAY QUE RECOGER LOS CHOICES QUE HAY DISPONIBLES DENTRO DEL TIPODE GRUPO

//     // return choices
//   }








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
    addNewGroups,
    getGroupByName,
    checkItemModified,
    updateGroup,
    getTaxonomyTermsChildren,
    getGroupByNames,
    getGroupForAttachment,
    getChoicesFromChoiceField
}