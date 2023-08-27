// import type { ISector } from "./ISector";

export interface IGrupos{
    Title: string;
    ID: number;
    codigo: number;
    // sector: ISector;
    denominacion: string;
    descripcion: string;
    fechaDeCreacion: string;
    // Ambito: string;
    TipoGrupo: string;
    // ubicacion: string;
    Estado: boolean;
    // Pais: Object;
    // Ciudad: Object;
    defaultValues: boolean;
    adjuntos:File
    	

}