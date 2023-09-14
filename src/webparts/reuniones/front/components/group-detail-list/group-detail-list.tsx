import * as React from "react"
import {
    ConstrainMode,
    DetailsList
  } from "@fluentui/react"
  import {useHistory} from "react-router-dom"
import { IGrupos,IGruposSimplificated } from "../../../interfaces/IGrupos"
import { useEffect,useState } from 'react'
// import { getGroupsFromList } from "../../../services/GroupServices"
import { GroupFunctions } from "../../../functions/GroupFunctions" 

import {
    DetailsListLayoutMode,
    
    IDetailsListStyles,
    IColumn 
  } from "office-ui-fabric-react";
import { SectorFunctions } from "../../../functions/SectorFunction"
 


export default function GroupDetailList () {

  const history = useHistory()

  const _onActiveItemChanged = (item:IGrupos) => {
    console.log(item)
    history.push(`/edit/${item.ID}`)
  };
  const gridStyles: Partial<IDetailsListStyles> = {
    root: {
      overflowX: 'scroll',
      selectors: {
        '& [role=grid]': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          // height: '60vh',
        },
      },
    },
    headerWrapper: {
      flex: '0 0 auto',
    },
    contentWrapper: {
      flex: '1 1 auto',
      overflow: 'hidden',
    },
  };
 

const columns: IColumn[] = [
  { key: 'ID', name: 'ID', fieldName: 'ID', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'denominacion', name: 'denominacion', fieldName: 'denominacion', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'descripcion', name: 'Descripcion', fieldName: 'descripcion', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'fechaDeCreacion', name: 'Fecha creacion', fieldName: 'fechaDeCreacion', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'fechaDeFinalizacion', name: 'Fecha final', fieldName: 'fechaDeFinalizacion', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'estadi', name: 'Estado', fieldName: 'Estado', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'Pais', name: 'Pais', fieldName: 'Pais', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'Ciudad', name: 'Ciudad', fieldName: 'Ciudad', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'Ambito', name: 'Ambito', fieldName: 'Ambito', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'Tematica', name: 'Tematica', fieldName: 'Tematic', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'TipoGrupo', name: 'TipoGrupo', fieldName: 'TipoGrupo', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'sectorAsociado', name: 'sectorAsociado', fieldName: 'sectorAsociado', minWidth: 100, maxWidth: 200, isResizable: true },
];

 
    const [groups,setGroups] = useState <IGrupos[]>([]);
    const [arrayDeGruposSimplificadosState, setArrayDeGruposSimplificadosState] = useState<IGruposSimplificated[]>([]);
  

    const arrayDeGruposSimplificados: IGruposSimplificated[] = [];
    useEffect(() => {

        const  getDataFromApi = async () =>{

          const prueba = await GroupFunctions.getTaxonomyTermsChildren('2a569ff2-2fe6-458d-990a-a3f32001ab99','00d9c3fc-e8ba-4acd-a3b1-a81f8367aea4')
          const ciudadesItem = await GroupFunctions.getTaxonomyTermsChildren('1e2cb030-5981-48aa-902f-2a338aa96107','2bc7e5fd-e09f-4fb1-87da-855111f5c1ea')
          const ambitosItems = await GroupFunctions.getTaxonomyTermsChildren('0a21538d-4770-44e7-9b33-a3c12e173c5d','7b28f990-5011-4c37-83d6-386c1c5c44b3')
          const datosOtroTipo = await SectorFunctions.getSectors();


            GroupFunctions.getAllGroups()
                .then(
                    (group)=>{
                        setGroups(group)
                        console.log(group)

                      
                        group.map((itemGroup) => {

                          prueba.map((taxonomyitem) => {
        
                            if (taxonomyitem.id === itemGroup?.Pais?.TermGuid) {
                              taxonomyitem.labels.map((term) => {
                                console.log(term)
                                  itemGroup.Pais.Label = term.name
                                  
                                })
                              }
                              
                              
                            })

                            ciudadesItem.map((taxonomyitem) => {
        
                              if (taxonomyitem.id === itemGroup?.Ciudad?.TermGuid) {
                                taxonomyitem.labels.map((term) => {
                                  console.log(term)
                                    itemGroup.Ciudad.Label = term.name
                                    
                                  })
                                }
                                
                                
                              })

                              ambitosItems.map((taxonomyitem) => {
        
                                if (taxonomyitem.id === itemGroup?.Ambito?.TermGuid) {
                                  taxonomyitem.labels.map((term) => {
                                    console.log(term)
                                      itemGroup.Ambito.Label = term.name
                                      
                                    })
                                  }
                                  
                                  
                                })
                                let sector:string =''
                                datosOtroTipo.map((choiceOption)=>{

                                  if(choiceOption.ID === itemGroup.sectorAsociadoId){
                                    sector=choiceOption.Denominacion
                                    console.log(sector)
                                  }

                                })

                            const grupoSimplificado: IGruposSimplificated = {
                              ID:itemGroup.ID,
                              denominacion: itemGroup.denominacion,
                              TipoGrupo:  itemGroup.TipoGrupo,
                              descripcion: itemGroup.descripcion,
                              Estado: itemGroup.Estado,
                              fechaDeCreacion:itemGroup.fechaDeCreacion,
                              fechaDeFinalizacion:itemGroup.fechaDeFinalizacion,
                              Pais:itemGroup.Pais?.Label,
                              Ciudad:itemGroup.Ciudad?.Label,
                              Ambito:itemGroup.Ambito?.Label,
                              sectorAsociado:sector,
                              Tematic: itemGroup.Tematic
                            };
                            

                            arrayDeGruposSimplificados.push(grupoSimplificado)
                            setArrayDeGruposSimplificadosState(arrayDeGruposSimplificados)
                          })
                          
                    }


                ).catch((error) => console.log(error))

                console.log(groups)


              
            
        }

        
         getDataFromApi().then((news) =>{news}).catch((error) =>console.error)
    },[])

    useEffect(()=>{
      console.log(arrayDeGruposSimplificados)
    },[arrayDeGruposSimplificados])

    return (

<div>
      <h1 >Listado de grupos</h1>
      <DetailsList
        columns={columns}
        items={arrayDeGruposSimplificadosState}
        setKey="set"
        layoutMode={DetailsListLayoutMode.fixedColumns}
        constrainMode={ConstrainMode.unconstrained} 
        // onItemInvoked={(e)=>onclick(c)}
        onActiveItemChanged={_onActiveItemChanged } 
        selectionPreservedOnEmptyClick
        styles={gridStyles}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
      />
    </div>

    )


}