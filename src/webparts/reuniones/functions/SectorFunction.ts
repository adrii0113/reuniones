import { getSP } from "../../../pnp-js-config";
import type { IList } from "@pnp/sp/lists";
import { ISector } from "../interfaces/ISector";

const getList = (): IList => getSP().web.lists.getByTitle('Sectores');


const getSectors = async (): Promise<ISector[]> =>{


    const sectores: ISector[] = await getList().items.select("ID","CodigoSector","Denominacion")()


    return sectores.map((sector) =>( {
        
        ID:sector.ID,
        CodigoSector:sector.CodigoSector,
        Denominacion:sector.Denominacion,
        
    }))



}


export const SectorFunctions = {
    getSectors
}