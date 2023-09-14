import * as React from "react"
import { useState, useEffect } from "react";

import { useForm  } from "react-hook-form";

import {SubmitHandler} from "react-hook-form";
// FUNCTIONS
import { GroupFunctions } from "../../../functions/GroupFunctions";

import { Functions } from "../../../utils/functions";
import "@pnp/sp/fields";
// FLUENT UI
import {
 
  Dropdown,
  IDropdownOption,
  Stack,
  IStackTokens,
  PrimaryButton
} from "@fluentui/react"
import {useHistory} from "react-router-dom"

import { Toggle } from 'office-ui-fabric-react/lib/Toggle'


import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

import { Alert } from "@fluentui/react-components/unstable";


// import { SPPermission } from '@microsoft/sp-page-context';

import { Field } from "@fluentui/react-components";
import { IGrupos } from "../../../interfaces/IGrupos";
// import { IReunionesProps } from "../../../components/IReunionesProps";
// import { ISector } from "../../../interfaces/ISector";
import type { WebPartContext } from "@microsoft/sp-webpart-base";
import { SectorFunctions } from "../../../functions/SectorFunction";




export interface GroupFormProps {
  grupo?: IGrupos;
  context?: WebPartContext;
  codigo?:string;
}
interface ErorrsFormProps {
  type?:any
  msg: string
  errors?:Object[]

}

export function GroupForm ({ grupo, context,codigo }: GroupFormProps){

  
  const history = useHistory()
  // USE FOORM CONFIG
  const { reset,handleSubmit, formState: {  } } = useForm();
  

  // estados de la opcion que seleccione el usuario en los seleccionables idropdown
  const [sector, setSector] = useState <IDropdownOption>()
  const [tipoGrupo, setTipoGrupo] = useState <IDropdownOption>()
  const [paisSeleccionado,setPaisSeleccionado] = useState <IDropdownOption>();
  const [ciudadSeleccionada,setCiudadSeleccionada] = useState <IDropdownOption>();
  const [ambitoSeleccionada,setAmbitoSeleccionado] = useState <IDropdownOption>();
  const [tematicaSeleccionada,setTematicaSeleccionada] = useState <IDropdownOption>();
  // estados de los valores que introduce el usuario en el formulario
  const [denominacion,setDenominacion] = useState ('');
  const [descripcion,setDescripcion] = useState ('');
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [fechaDeCreacion, setFechaDeCreacion] = useState('');
  // const [fechaFinal, setFechaFinal]  = useState('');
  const [selectedFinishDate, setSelectedFinishDate] = useState<Date | null>(null);
  const [estado, setEstado] = useState(grupo ? grupo.Estado : false);
  
  // estados de comprobacion de permisos y duplicidad
  const [titleExist,setTitleExist] = useState(false)
  const [haveReadPerms,setHaveReadPerms] = useState(true)

 
  // estados para almacenar las opciones taxonomy para luego mostrar en el desplegable dropdown
  const [ciudadesOptions,setCiudadesOptions] = useState<IDropdownOption[]>([])
  const [paisesOptions,setPaisesOptions] = useState<IDropdownOption[]>([])
  const [ambitosOptions,setAmbitosOptions] = useState<IDropdownOption[]>([])
  const [sectorOptions, setSectorOPtions] = useState <IDropdownOption[]>([])
  const [groupOptions, setGroupOptions] = useState <IDropdownOption[]>([])
  const [tematicOptions, setTematicOptions] = useState <IDropdownOption[]>([])
  
  // estados para almacenar los errores de validacion del formulario
  const [errorsStorage,setErrorsStorage] = useState<ErorrsFormProps[]>([])
  const [warningsStorage,setWarningsStorage] = useState<ErorrsFormProps[]>([])
  // const [infoStorage,setInfoStorage] = useState<ErorrsFormProps[]>([])
  // const [errores, setErrores] = useState<ErorrsFormProps[]>([]);
  const [newItemFormItem,setNewItemFormItem] = useState<IGrupos>({
    
    denominacion:grupo?.denominacion || '',
    TipoGrupo: grupo?.TipoGrupo || null,
    descripcion:grupo?.descripcion || '',
    Estado:grupo?.Estado || false,
    fechaDeCreacion:grupo?.fechaDeCreacion.toString() ||   new Date().toISOString(),
    fechaDeFinalizacion:null,
    Pais:{TermGuid:grupo?.Pais.TermGuid||'',Label:grupo?.Pais.Label||'',WssId:grupo?.Pais.WssId || -1} ||    {TermGuid:paisSeleccionado?.data||'',Label:paisSeleccionado?.text||'',WssId:-1},
    Ciudad:{TermGuid:ciudadSeleccionada?.data||'',Label:ciudadSeleccionada?.text||'',WssId:-1},
    Ambito:{TermGuid:ciudadSeleccionada?.data||'',Label:ciudadSeleccionada?.text||'',WssId:-1},
    sectorAsociadoId:grupo?.sectorAsociadoId || null,
    Tematic:grupo?.TipoGrupo || null,
    
  });

  // recoger los datos del item que selecciona en la lista
  useEffect(() =>{
    setFechaDeCreacion(grupo?.fechaDeCreacion)
    setSelectedDate(new Date(grupo?.fechaDeCreacion))
    // setFechaFinal(grupo?.fechaDeFinalizacion)
    setSelectedFinishDate(new Date(grupo?.fechaDeFinalizacion))
    setTipoGrupo({key:grupo?.TipoGrupo,text:grupo?.TipoGrupo})
  },[grupo])

  const [selectedCountry,setSelectedCountry] = useState ('')
  const [selectedCity,setSelectedCity] = useState ('')
  const [selectedAmbito,setSelectedAmbito] = useState ('')
  const fileInputRef = React.useRef<HTMLInputElement>(null);

 

  useEffect(() => {
    if (grupo) {
      
     
      console.log(grupo)
     
      
    }
    // funcion para comprobar que el taxonomy item que seleeciona el usuario coincide con uno de las opciones que existen en el term store de sharepoint
    const testssss = async () => {

      const prueba = await GroupFunctions.getTaxonomyTermsChildren('2a569ff2-2fe6-458d-990a-a3f32001ab99','00d9c3fc-e8ba-4acd-a3b1-a81f8367aea4',grupo?.Pais.TermGuid)
      const ciudadesItem = await GroupFunctions.getTaxonomyTermsChildren('1e2cb030-5981-48aa-902f-2a338aa96107','2bc7e5fd-e09f-4fb1-87da-855111f5c1ea')
      const ambitosItems = await GroupFunctions.getTaxonomyTermsChildren('0a21538d-4770-44e7-9b33-a3c12e173c5d','7b28f990-5011-4c37-83d6-386c1c5c44b3')


      prueba.map((taxonomyitem) => {
        
          if (taxonomyitem.id === grupo?.Pais?.TermGuid ) {
            taxonomyitem.labels.map((term) => {
                console.log(term)
                setSelectedCountry(term.name)
                setPaisSeleccionado({text:term.name,data:taxonomyitem.id,key:1})
              })
            }
            

      })

      ciudadesItem.map((taxonomyitem) => {
        
        if (taxonomyitem.id === grupo?.Ciudad?.TermGuid ) {
          taxonomyitem.labels.map((term) => {
              console.log(term)
              setSelectedCity(term.name)
              setCiudadSeleccionada({text:term.name,data:taxonomyitem.id,key:1})
            })
          }
          

    })

    ambitosItems.map((taxonomyitem) => {
        
      if (taxonomyitem.id === grupo?.Ambito?.TermGuid ) {
        taxonomyitem.labels.map((term) => {
            console.log(term)
            setSelectedAmbito(term.name)
            setAmbitoSeleccionado({text:term.name,data:taxonomyitem.id,key:1})
          })
        }
        
        
  })


    }

    testssss().then((item) => item).catch( void console.error)
      
    
  }, [paisesOptions]);


  const [showSuccessBanner, setShowSuccessBanner] = useState(false);


  const cleanStates = () => {
    setSelectedDate(null)
    setSelectedFinishDate(null)
  }
  

  const onSubmit: SubmitHandler<IGrupos> = data => setNewItemFormItem(data);
  
  



  useEffect(() => {

   reset()
  },[newItemFormItem])


  
  
  useEffect(() => {

    // aqui comprobamos que el haveuserpermissions es false y si es false ponemos el formulario vacio
    // haveReadPerms === true ? grupo = : null;
    
    const get = async () => {


      const datosOtroTipo = await SectorFunctions.getSectors();
    

      const opciones = datosOtroTipo.map((otroTipo) => ({
        key: otroTipo.ID, 
        text: otroTipo.Denominacion,
      }));
      
      setSectorOPtions(opciones)


      let tipoGrupos : IDropdownOption[] = []

      const prueba = await GroupFunctions.getChoicesFromChoiceField()
      prueba.Choices.map((choice) => {
        tipoGrupos.push({key: choice,
        text:choice})


        
      })

     
      setGroupOptions(tipoGrupos)


      let tematicas : IDropdownOption[] = []

      const tematicFromApi = await GroupFunctions.getTematicChoicesFromChoiceField()
      tematicFromApi.Choices.map((choice) => {
        tematicas.push({key: choice,
        text:choice})


        
      })


     setTematicOptions(tematicas)
       
    }

    get().then((items)=> items).catch(console.error)

    // en vex de full control auqi tengo que poner el de comprobar los permisos de read
    setHaveReadPerms(Functions.checkFullControlPermission(context))

   
    
  },[])


  
  useEffect(() =>{
    
   
   
    const gett = async () => {

    
      // comprobar que el item que se intenta mofificar no ha sido modificado por otro usuario previamente
      const hola =  await GroupFunctions.checkItemModified(2,context.pageContext.user.displayName)
      console.log(hola)
    }


    gett().then((item) =>{item}).catch((error) => error)
    
  },[newItemFormItem])

  const insetNewItem = async () => {

    try {
      
      // asigno aqui las propiedades porq si no no me las pilla
      const  sectorKeyNumberFormat: number = parseInt(sector?.key.toString())
      
      newItemFormItem.denominacion = denominacion || grupo?.denominacion
      newItemFormItem.descripcion = descripcion || grupo?.descripcion
      newItemFormItem.Ciudad = {TermGuid:ciudadSeleccionada?.data,Label:ciudadSeleccionada?.text,WssId:-1}
      newItemFormItem.Pais= {TermGuid:paisSeleccionado?.data,Label:paisSeleccionado?.text,WssId:-1}
      newItemFormItem.Ambito ={TermGuid:ambitoSeleccionada?.data,Label:ambitoSeleccionada?.text,WssId:-1}
      newItemFormItem.Tematic= tematicaSeleccionada?.text
      // control de fecha
      if(selectedDate != null){newItemFormItem.fechaDeCreacion = selectedDate.toISOString()}
      else{
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString()
        newItemFormItem.fechaDeCreacion = formattedDate
        
      }
      
      
      selectedFinishDate ? newItemFormItem.fechaDeFinalizacion = selectedFinishDate.toISOString()  : null
      
      
      
      estado === true ? newItemFormItem.Estado = true: newItemFormItem.Estado= false;
      
      newItemFormItem.sectorAsociadoId = sectorKeyNumberFormat
      
      newItemFormItem.TipoGrupo = tipoGrupo?.text
      

      const itemExiste = await GroupFunctions.getGroupByName(newItemFormItem?.denominacion)
       
      if (itemExiste > 0) {
        
        setTitleExist(true) 
        if (!warningsStorage.some((error) => error.msg === 'El titulo del grupo ya existe en la lista' )){
          setWarningsStorage([...warningsStorage, Functions.addError('El titulo del grupo ya existe en la lista','warning')]);
          
        }

        // addError('El titulo del grupo ya existe en la lista', 'error')
      } else{


        interface Objeto {
          stateType: string;
          nombre: string;
        }
       
        // aqui envio los estados para que se validen
        const miArray:Objeto[] = [
          { stateType: 'Ciuad', nombre: ciudadSeleccionada?.text },
          { stateType: 'Pais', nombre: paisSeleccionado?.text },
          { stateType: 'TipoGrupo', nombre: tipoGrupo?.text },
          { stateType: 'FechaDeCreacion', nombre: selectedDate?.toISOString() },
          { stateType: 'Sector', nombre: sector?.text },
          { stateType: 'FechaDeFinalizacion', nombre: selectedFinishDate?.toISOString() },
          
        ];
        const resultadoValidaciones = Functions.validateStates(miArray)


        if (resultadoValidaciones.length > 0) {
          
          if (!warningsStorage.some((error) => error.msg === 'No se puede crear el objeto porque hay los siguientes errores de validacion:' + resultadoValidaciones.map((errormsg) => errormsg))) {
            setWarningsStorage([ Functions.addError('No se puede crear el objeto porque hay los siguientes errores de validacion:' + resultadoValidaciones.map((errormsg) => errormsg),'warning')]);
            // setErrorsStorage([]);
          }
          

        } else{
          
          
          setShowSuccessBanner(true);
          console.log(newItemFormItem)
          grupo ? await GroupFunctions.updateGroup(Number(codigo),newItemFormItem) : await GroupFunctions.addNewGroups(newItemFormItem)
          

          const itemCreado = await GroupFunctions.getGroupByNames(newItemFormItem.denominacion)
          let id:number = null
          itemCreado.map((item) => {id = item.ID})
          
          if(selectedFile){await GroupFunctions.getGroupForAttachment(id,selectedFile)} else{null}
          // limpiar estados
          cleanStates()
           
         
          
          setTitleExist(false)
        }
        
        
      }

    } catch (error) {
      setErrorsStorage([...errorsStorage, Functions.addError(error,'error')]);
    }
    
   


  }


  // *****HANDLERS*****//
  const handleSector = (_: unknown,value:IDropdownOption):void => {

    setSector(value)
    console.log(sector)

    sector !== undefined ? setSector(value) : console.log('no existe aun')
    
    
  }
  const handlePais = (_: unknown,value:IDropdownOption):void=> {
    
    setPaisSeleccionado(value)
    setSelectedCountry(value.text)
    console.log(value)
    
  }

  const handleCiudad = (_: unknown,value:IDropdownOption):void => {
    setCiudadSeleccionada(value)
    setSelectedCity(value.text)
    console.log(value)
  }

  const handleAmbito = (_: unknown,value:IDropdownOption):void => {
    setAmbitoSeleccionado(value)
    console.log(value)
  }

  const handleTipoGrupo = (_: unknown,value:IDropdownOption):void => {
    setTipoGrupo(value)
    console.log(value)
  }

  const handleTematica = (_: unknown,value:IDropdownOption):void => {
    setTematicaSeleccionada(value)
    console.log(value)
  }

  // upload files
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
    console.log(file)
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredDate = new Date(event.target.value);
    setSelectedDate(enteredDate);
    setFechaDeCreacion(Functions.isoDate(enteredDate.toString()));
    
  };

  const handleFinishDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredDate = new Date(event.target.value);
    setSelectedFinishDate(enteredDate);
    console.log(enteredDate.toISOString())
  };


  const onChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean)=> {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
    console.log(estado)
    checked ? setEstado(true) : setEstado(false);
  }


  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmitAction = async () => {

    await insetNewItem()

    
  }


  // *****END-HANDLERS*****//
  


  useEffect(() => {


    const assignTaxonomyTermsToDropDownOptions = async () => {


      // recojo los terminos taxonomy porque por las versiones no puedo utilizar ipeckerterms
      const ciudadesItem = await GroupFunctions.getTaxonomyTermsChildren('1e2cb030-5981-48aa-902f-2a338aa96107','2bc7e5fd-e09f-4fb1-87da-855111f5c1ea')
      const paisesItems = await GroupFunctions.getTaxonomyTermsChildren('2a569ff2-2fe6-458d-990a-a3f32001ab99','00d9c3fc-e8ba-4acd-a3b1-a81f8367aea4')
      const ambitosItems = await GroupFunctions.getTaxonomyTermsChildren('0a21538d-4770-44e7-9b33-a3c12e173c5d','7b28f990-5011-4c37-83d6-386c1c5c44b3')

     
      
      let ciudadesArray : IDropdownOption[] = []
      ciudadesItem.map((label)=>{

      
        
        label.labels.map((labelsName)=>{


        ciudadesArray.push({
          key: labelsName.name,
          text: labelsName.name,
          data:label.id
        })
       
        
        setCiudadesOptions(ciudadesArray)
      })
    })


      let paisesArray : IDropdownOption[] = []
    
      
      paisesItems.map((label)=>{

        label.labels.map((labelsName)=>{

          paisesArray.push({
            key: labelsName.name,
            text: labelsName.name,
            data:label.id
          })
        setPaisesOptions(paisesArray)
        

        })

      })


      let ambitosArray : IDropdownOption[] = []
    
      
      ambitosItems.map((label)=>{

        label.labels.map((labelsName)=>{

          ambitosArray.push({
            key: labelsName.name,
            text: labelsName.name,
            data:label.id
          })
        setAmbitosOptions(ambitosArray)
        
        })

      })
 
    }

    assignTaxonomyTermsToDropDownOptions().then((item) =>item).catch((error) =>error)

  },[grupo])


 
  const buttonStackTokens: IStackTokens = {
    childrenGap: 8, // Espacio entre los botones
  };
  const stackTokens: IStackTokens = { childrenGap: 20 };

  
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="create-group">
      

    {haveReadPerms !== true ? <Alert intent="error" action="Retry">
      El usuario actual no tiene permisoss de lectura en este elemento
      
    </Alert> : null}
    

    {
      titleExist === true ? <div>
        
      {/* <MessageBar
          messageBarType={MessageBarType.warning}>
             La denominación ya existe
        </MessageBar> */}
    </div> : null
    }
    {
      showSuccessBanner != false ?
      <div>
        
        <MessageBar
            messageBarType={MessageBarType.success}>
               Grupo guardado con exito
          </MessageBar>
      </div>
      : null
    }
    {
      errorsStorage.map((error, index) => (

        <div>
          
          <MessageBar
            messageBarType={MessageBarType.error}>
            {error.msg}
          </MessageBar>
        </div>
        
      ))
      
    }
    {
      warningsStorage.map((error, index) => (

        <div>
          <MessageBar
              messageBarType={MessageBarType.severeWarning}>
              {error.msg}
          </MessageBar>
        </div>
        
      ))
    }
    <form onSubmit={handleSubmit(onSubmit)}>
    <Stack horizontal tokens={stackTokens}>
      
    
    <Stack.Item grow={1}>
   
    
      <Field label="Denominación del grupo">
      <input type="text" placeholder={'Escribe la denominación del grupo'}  value={grupo?.denominacion} onChange={(e)=>setDenominacion(e.target.value)}/>
      </Field>
      
      <Field label="Descripcion">
        <textarea placeholder="Descripción del sector"  name="descripcion"  value={grupo?.descripcion}  onChange={(e)=>setDescripcion(e.target.value)}/>
      </Field>
      {/* {fechaDeCreacion}
      {fechaFinal} */}
      <Field label='Fecha de creación'>
        <input type="date" name="fechaDeCreacion" placeholder={fechaDeCreacion} required={true} onChange={handleDateChange}/>
      </Field>

      <Field label='Fecha de finalización'>
        <input type="date"  name="fechaFinalizacion" required={true} onChange={handleFinishDateChange} />
      </Field>

      <Toggle label="Estado" onText="Activo" offText="Inactivo" onChange={onChange}  />
      
      <Field label='Sector'>
      <Dropdown
        placeholder="Seleccione un sector"
        
        defaultSelectedKey={grupo?.sectorAsociadoId}
        options={sectorOptions}

        onChange={handleSector.bind(this)}
        // selectedKey={category?.key}
        // selectedKey={grupo?.sector.Denominacion}
        
      />
      </Field>
      </Stack.Item>

      {/* Columna 2 */}
      
      <Stack.Item grow={1}>
      
        {/* Contenido de la segunda columna */}
        
        <Stack horizontal tokens={buttonStackTokens}>
        {grupo ? (<PrimaryButton onClick={handleSubmitAction} type="submit">Editar</PrimaryButton>) : (<PrimaryButton onClick={handleSubmitAction} type="submit">Guardar</PrimaryButton>) }
        <PrimaryButton onClick={()=>history.push('/list')}>Cancelar</PrimaryButton>
      </Stack>

    
      <Field label='Tipo de grupo'>
      <Dropdown
        placeholder="Seleccione un grupo"
        defaultSelectedKey={grupo?.TipoGrupo}
        options={groupOptions}
        onChange={handleTipoGrupo}
        
      />
      </Field>


      <Field label='Temática'>
      <Dropdown
        placeholder="Seleccione una temática"
        defaultSelectedKey={grupo?.Tematic}
        options={tematicOptions}
        onChange={handleTematica}
        
      />
      </Field>

      <Field label='País'>
      {grupo ? <Dropdown
      
      selectedKey={selectedCountry}
      options={paisesOptions}
      
      
      onChange={handlePais.bind(this)}
      ></Dropdown> : <Dropdown
      placeholder='Seleecione una ciudad'
      options={paisesOptions}
     
      onChange={handlePais.bind(this)}
      ></Dropdown>}
      
      
      </Field>
    

      <Field label='Ciudad'>
          {grupo ? <Dropdown
            selectedKey={selectedCity}
            options={ciudadesOptions}
            onChange={handleCiudad}
            
            /> : <Dropdown
            placeholder="Seleccione una ciudad"
            options={ciudadesOptions}
            onChange={handleCiudad}
      
          
          />
          }
      
      </Field>
      <Field label='Ambito'>
      {grupo?.Ambito ? <Dropdown
        placeholder={selectedAmbito}
        options={ambitosOptions}
        selectedKey={selectedAmbito}
        onChange={handleAmbito}
      /> : <Dropdown
      placeholder="Seleccione una ciudad"
      
      
      options={ambitosOptions}
      
      onChange={handleAmbito}
      
      
      
    />
    }
     
      </Field>


      <Field label='Adjuntos'>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' , width: '10%'}}
        onChange={handleFileChange}
      />
      <PrimaryButton onClick={handleButtonClick}>Examinar archivo</PrimaryButton>
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      </Field>
      
      </Stack.Item>
      
    </Stack>
      </form>

    
    
  
    </div>
  );



}