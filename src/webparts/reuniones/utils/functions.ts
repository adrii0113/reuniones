// import {  UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import { SPPermission } from '@microsoft/sp-page-context';
import { WebPartContext } from '@microsoft/sp-webpart-base';
// import { IReunionesProps } from '../components/IReunionesProps';

const dateFormat = () =>{

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;


}


const isoDate = (date: string) =>{


    const parts = date.split('/');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}


// const convertirANumero = (objeto: string): number | null => {
//     const numero = parseFloat(texto);
//     return isNaN(numero) ? null : numero;
// };






// const getQueryString= () =>{


// }
// import type { IPickerTerms } from "@pnp/spfx-controls-react";
import { IDropdownOption } from "office-ui-fabric-react";

export interface ITaxField {
  Label: string;
  TermGuid: string;
  WssId: number;
}

//  const getTaxField = (item: any, key: keyof typeof item): ITaxField => {
//   const { TermGuid, WssId } = item[key];
//   const taxAll: any[] = item.TaxCatchAll ?? [];
//   const Label = taxAll.find((tax) => tax.ID === WssId)?.Term ?? "";
//   return { Label, TermGuid, WssId };
// };

 const buildTaxField = ({ key, text }: IDropdownOption): ITaxField => ({

  Label: text,
  TermGuid: key.toString(),
  WssId: -1,

  

});


// functions to check current user permissions

const checkFullControlPermission = (context:WebPartContext): boolean => {
  //Full Control group can add item to list/library and mange web.

  let permission = new SPPermission(context.pageContext.web.permissions.value);
  let isFullControl = permission.hasPermission(SPPermission.manageWeb);
  console.log(isFullControl)
  return isFullControl;
}
const checkEditorPermission = (context:WebPartContext) => {
  
  //Editor group can add item on list/library via addListItems permission
  let permission = new SPPermission(context.pageContext.web.permissions.value);
  let isMemberPermission = permission.hasPermission(SPPermission.addListItems);
  console.log(isMemberPermission)
  return isMemberPermission;
}
const checkReadPermission = (context:WebPartContext) => {
  //Reader group can read item on list/library via viewListItems permission
  let permission = new SPPermission(context.pageContext.web.permissions.value);
  let isReadPermission = permission.hasPermission(SPPermission.viewListItems);
  console.log(isReadPermission)
  return isReadPermission;
}


export const Functions = {
    dateFormat,
    isoDate,
    // getTaxField,
    buildTaxField,
    checkFullControlPermission,
    checkEditorPermission,
    checkReadPermission
    // getQueryString
}


