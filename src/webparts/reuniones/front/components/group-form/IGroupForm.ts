import type { ISector } from "../../../interfaces/ISector";
export interface IGroupForm{

    Title: string;
    id: number;
    codigo: string;
    sector: ISector;
    denominacion: string;
    descripcion: Object;
    // fechaDeCreacion: Date;
    // Ambito: string;
    TipoGrupo: string;
    ubicacion: string;
    Estado: boolean;
    


}