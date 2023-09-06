// aqui se mostrara una lista con todas los grupos que existen ?

import * as React from "react"
import {
    DetailsList
  } from "@fluentui/react"

import { IGrupos } from "../../interfaces/IGrupos"

// import { GroupForm } from "../../front/components/group-form/group-form"

// get data from api
export default function ListaGrupos (arrGrupos: IGrupos[]){


    return (
    
    <div>
        <DetailsList items={arrGrupos}></DetailsList>
        {/* <GroupForm></GroupForm> */}
    </div>
    
    
    
    )

    



}