
// import type { ISector } from "./ISector";
import type { ITaxField } from "../functions/GroupFunctions";
// import {
 
    
//     IDropdownOption,
//   } from "@fluentui/react"





export interface IGrupos{
    // Title: string;
    ID?: number;
    // codigo: number;
    sectorAsociadoId: number;
    denominacion: string;
    descripcion: string;
    fechaDeCreacion: string;
    fechaDeFinalizacion: string;
    TipoGrupo: string;
    Estado: boolean;
    Pais: ITaxField;
    Ciudad: ITaxField;
    Ambito: ITaxField;
    Tematic:string;
    
    	

}