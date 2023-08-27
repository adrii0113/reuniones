import * as React from 'react';


import {Nav, INavLinkGroup} from 'office-ui-fabric-react'

const group : INavLinkGroup[] = [

    {
        links:[

            {name:"Editar grupo", url:"#/edit/:codigo"},
            {name:"Alta grupo", url:"#/newgroup"},
            {name:"Lista grupos",url:"#/list"}
        ]
    }

]

export default function Spa (){



    return <Nav groups={group}></Nav>

}