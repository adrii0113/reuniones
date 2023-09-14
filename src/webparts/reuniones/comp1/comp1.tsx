import * as React from 'react';


import {Nav, INavLinkGroup} from 'office-ui-fabric-react'

const group : INavLinkGroup[] = [

    {
        links:[

            // {name:"Editar grupo", url:"#/edit/:codigo"},
            {name:"Lista grupos",url:"#/list"},
            {name:"Alta grupo", url:"#/newgroup"}
        ]
    }

]

export default function Spa (){



    return <Nav groups={group}></Nav>

}