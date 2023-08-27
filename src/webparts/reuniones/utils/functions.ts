// import {  UrlQueryParameterCollection } from '@microsoft/sp-core-library';


const dateFormat = () =>{

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;


}


const isoDate = (date: string) =>{


    const parts = date.split('/');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}


// const convertirANumero = (objeto: string): number | null => {
//     const numero = parseFloat(texto);
//     return isNaN(numero) ? null : numero;
// };


// const getQueryString= () =>{


// }

export const Functions = {
    dateFormat,
    isoDate,
    // getQueryString
}


