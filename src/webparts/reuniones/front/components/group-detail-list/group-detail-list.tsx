import * as React from "react"
import {
    ConstrainMode,
    DetailsList
  } from "@fluentui/react"
import { IGrupos } from "../../../interfaces/IGrupos"
import { useEffect,useState } from 'react'
// import { getGroupsFromList } from "../../../services/GroupServices"
import { GroupFunctions } from "../../../functions/GroupFunctions" 

import {
    DetailsListLayoutMode,
    // initializeIcons,
    Sticky,
    StickyPositionType,

    ScrollablePane,
    ScrollbarVisibility,

  } from "office-ui-fabric-react";
 

  const sbWidth = 6;
  const sbHeight = 6;
  const sbBg = "pink";
  const sbThumbBg = "red";


export default function GroupDetailList () {

    // let lista : IGrupos[];
    const [groups,setGroups] = useState <IGrupos[]>([]);
   
    useEffect(() => {

        const  getDataFromApi = async () =>{

            GroupFunctions.getAllGroups()
                .then(
                    (group)=>{
                        setGroups(group)
                        console.log(group)
                    }
                ).catch((error) => console.log(error))

            // console.log(lista)
        }

         getDataFromApi().then((news) =>{console.log(news)}).catch((error) =>console.log(error))
    },[])

    return (

    //   <DetailsList items={groups} constrainMode={ConstrainMode.unconstrained} ></DetailsList>
    <div style={{ position: "relative", height: 400 }}>
      <ScrollablePane
        scrollbarVisibility={ScrollbarVisibility.auto}
        styles={{
          root: {
            selectors: {
              ".ms-ScrollablePane--contentContainer": {
                scrollbarWidth: sbWidth,
                scrollbarColor: `${sbThumbBg} ${sbBg}`
              },
              ".ms-ScrollablePane--contentContainer::-webkit-scrollbar": {
                width: sbWidth,
                height: sbHeight
              },
              ".ms-ScrollablePane--contentContainer::-webkit-scrollbar-track": {
                background: sbBg
              },
              ".ms-ScrollablePane--contentContainer::-webkit-scrollbar-thumb": {
                background: sbThumbBg
              }
            }
          }
        }}
      >
        <DetailsList
          items={groups}
          
          layoutMode={DetailsListLayoutMode.fixedColumns}
          constrainMode={ConstrainMode.unconstrained}
          onRenderDetailsHeader={(headerProps, defaultRender) => {
            return (
              <Sticky
                stickyPosition={StickyPositionType.Header}
                isScrollSynced={true}
                stickyBackgroundColor="transparent"
              >
                {defaultRender({
                  ...headerProps,
                  styles: {
                    root: {
                      selectors: {
                        ".ms-DetailsHeader-cellName": {
                          fontWeight: "bold",
                          fontSize: 13
                        }
                      },
                      background: "#f5f5f5",
                      borderBottom: "1px solid #ddd",
                      paddingTop: 1
                    }
                  }
                })}
              </Sticky>
            );
          }}
        />
      </ScrollablePane>
      
    </div>

    )


}