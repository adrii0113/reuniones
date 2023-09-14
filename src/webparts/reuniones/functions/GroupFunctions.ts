

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
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(group.descripcion, 'text/html');
    const plainText = parsedHTML.body.textContent;


    const fechaFormateada = new Date(group.fechaDeCreacion).toISOString().split('T')[0];
    const item: IGrupos= {

        ID:group.ID,
        sectorAsociadoId: group.sectorAsociadoId,
        denominacion: group.denominacion,
        descripcion: plainText,
        fechaDeCreacion: fechaFormateada,
        fechaDeFinalizacion:group.fechaDeFinalizacion,
        Ambito: group.Ambito,
        TipoGrupo: group.TipoGrupo,
        Estado: group.Estado,
        Pais: group.Pais,
        Ciudad: group?.Ciudad,
        Tematic:group.Tematic
      
        
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

        ID:group.ID,
        sectorAsociadoId: group.sectorAsociadoId,
        denominacion: group.denominacion,
        descripcion: group.descripcion,
        fechaDeCreacion: group.fechaDeCreacion,
        fechaDeFinalizacion: group.fechaDeFinalizacion,
        TipoGrupo: group.TipoGrupo,
        Estado: group.Estado,
        Pais: group.Pais,
        Ciudad: group.Ciudad,
        Ambito:group.Ambito,
        Tematic:group.Tematic,
       
        

      }))
  
}

const getGroupByName = async (name: string) => {
    // comprobar que el grupo que se esta intentando crear ya existe
    console.log(name)
    const group : IGrupos[] =  await getList().items.select('*')()
    const result = group.filter((item) => item.denominacion === name)

    return result.length

  
}


const getGroupByNames = async (name: string) => {
    // comprobar que el grupo que se esta intentando crear ya existe
    const group : IGrupos[] =  await getList().items.select('*')()
    const result = group.filter((item) => item.denominacion === name)

    return result

  
}




const addNewGroups = async (item: IGrupos) => {
    // const list = await sp.web.lists.getByTitle("My Lookup List")();
    // const field = await getList().fields.addLookup("My Field", { LookupListId: list.data.Id, LookupFieldName: "Title" });


    const {ID,denominacion,descripcion,fechaDeCreacion,fechaDeFinalizacion,Pais,Ciudad,sectorAsociadoId,Estado,TipoGrupo,Ambito,Tematic} = item;
    const fechaFormateada = new Date(fechaDeCreacion).toISOString().split('T')[0];
    const newItems = await getList().items.add({
       
        ID:ID,
        sectorAsociadoId:sectorAsociadoId,
        denominacion:denominacion,
        descripcion:descripcion,
        fechaDeCreacion:fechaFormateada,
        fechaDeFinalizacion:fechaDeFinalizacion,
        TipoGrupo:TipoGrupo,
        Estado:Estado,
        Pais:Pais,
        Ciudad:Ciudad,
        Ambito:Ambito,
        Tematic:Tematic
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


    console.log(itemId)
    console.log(newGroup)
    const {ID,denominacion,descripcion,fechaDeCreacion,fechaDeFinalizacion,Pais,Ciudad,sectorAsociadoId,Estado,TipoGrupo,Ambito} = newGroup;
    try {
        
        await getList().items.getById(itemId).update({

            // Title:Title,
            ID:ID,
            // codigo:codigo,
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



  const getTaxonomyTermsChildren = async (groupId: string, termId: string,aid?:string)=> {

    // console.log((await getSP().termStore.groups.getById(groupId).sets.getById(termId).children()))
    const terms = await getSP().termStore.groups.getById(groupId).sets.getById(termId).children()
    // console.log(await getSP().termStore.groups.getById(groupId).sets.getById(termId).children())


    // console.log((await getSP().termStore.groups.getById(groupId).sets.getById(termId).children()))
    
    
    return terms
  }



  const getChoicesFromChoiceField = async  () => {

    const list =  getSP().web.lists.getByTitle("Grupos");
    const fields = await list.fields.getByInternalNameOrTitle("TipoGrupo")()
    // console.log(fields.Choices)

    
    return fields
  }


  const getTematicChoicesFromChoiceField = async () => {
    const list =  getSP().web.lists.getByTitle("Grupos");
    const fields = await list.fields.getByInternalNameOrTitle("Tematic")()

    return fields
  }














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
    getChoicesFromChoiceField,
    getTematicChoicesFromChoiceField
}