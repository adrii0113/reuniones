import { getSP } from "../../../pnp-js-config";
import type { IList } from "@pnp/sp/lists";
import { ISector } from "../interfaces/ISector";

const getList = (): IList => getSP().web.lists.getByTitle('Sectores');


const getSectors = async (): Promise<ISector[]> =>{


    const sectores: ISector[] = await getList().items.select("Title","ID","CodigoSector","Denominacion")()


    // return sectores.map((sector) =>( {
    //     Title:sector.Title,
    //     ID:sector.ID,
    //     CodigoSector:sector.CodigoSector,
    //     Denominacion:sector.Denominacion,
        
    // }))

    return sectores



}


export const SectorFunctions = {
    getSectors
}