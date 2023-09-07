import * as React from "react"
import { useState, useEffect } from "react";

import { useForm  } from "react-hook-form";

import {SubmitHandler} from "react-hook-form";
// FUNCTIONS
import { GroupFunctions } from "../../../functions/GroupFunctions";
// import { SectorFunctions } from "../../../functions/SectorFunction";
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

import { Toggle } from 'office-ui-fabric-react/lib/Toggle'
import type { ITaxField } from "../../../functions/GroupFunctions";
// import { Switch } from "@fluentui/react-components"
// import type { SwitchProps } from "@fluentui/react-components";

// import { Dropdown } from "@fluentui/react-components";


// import type { IDropdownOption } from "office-ui-fabric-react";
import { Alert } from "@fluentui/react-components/unstable";

// import { TaxonomyPicker } from "@pnp/spfx-controls-react";

import {  IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
export interface ISpfxPnpTaxonomypickerState {
  tags: IPickerTerms;
}


// import { SPPermission } from '@microsoft/sp-page-context';
type Inputs = {
    example: string,
    exampleRequired: string,
    Title: string,
    denominacion: string,
    codigo: number,
    id?:number,
    sectorAsociado?:string,
    nombre: string,
    descripcion: string,
    fechaDeCreacion: Date,
    fechaFinalizacion: Date,
    Estado?: boolean,
    tipoGrupo: IDropdownOption,
    adjunto:FileList,
    Ciudad?:ITaxField,
    Pais?:IDropdownOption
  };
// import { IGroupForm } from "./IGroupForm";
import { Field } from "@fluentui/react-components";
import { IGrupos } from "../../../interfaces/IGrupos";
// import { IReunionesProps } from "../../../components/IReunionesProps";
// import { ISector } from "../../../interfaces/ISector";
import type { WebPartContext } from "@microsoft/sp-webpart-base";
import { SectorFunctions } from "../../../functions/SectorFunction";

const categories :IDropdownOption[] = [
  {key: "transporte", text: "Transporte"},
  {key: "comercio", text: "Comercio"},
  {key: "educacion", text: "Educacion"},
  {key: "construccion", text: "Construccion"},
]





export interface GroupFormProps {
  grupo?: IGrupos;
  context?: WebPartContext;
}
interface ErorrsFormProps {

  msg: string

}

export function GroupForm ({ grupo, context }: GroupFormProps){

  
  // const [date,setSelectedDate] = useState(Functions.dateFormat())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedFinishDate, setSelectedFinishDate] = useState<Date | null>(null);
  const [estado, setEstado] = useState(false);
  // USE FOORM CONFIG
  const { register, handleSubmit,reset, watch, formState: {  } } = useForm<Inputs>();
  // const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  // estados de la opcion que seleccione el usuario en los seleccionables
  const [sector, setSector] = useState <IDropdownOption>()
  const [tipoGrupo, setTipoGrupo] = useState <IDropdownOption>()
  const [paisSeleccionado,setPaisSeleccionado] = useState <IDropdownOption>();
  const [ciudadSeleccionada,setCiudadSeleccionada] = useState <IDropdownOption>();
  const [ambitoSeleccionada,setAmbitoSeleccionado] = useState <IDropdownOption>();
  // const [adjuntos] = useState<File>()
  const [titleExist,setTitleExist] = useState(false)
  const [haveReadPerms,setHaveReadPerms] = useState(true)
  

  // estado para almacenar los taxonomy terms
  // state para alamacenar los items que hay en el term set de ciudades
  const [ciudadesOptions,setCiudadesOptions] = useState<IDropdownOption[]>([])
  const [paisesOptions,setPaisesOptions] = useState<IDropdownOption[]>([])
  const [ambitosOptions,setAmbitosOptions] = useState<IDropdownOption[]>([])
  const [sectorOptions, setSectorOPtions] = useState <IDropdownOption[]>([])
  const [groupOptions, setGroupOptions] = useState <IDropdownOption[]>([])
  // error control array 
  const [errorsStorage,setErrorsStorage] = useState<ErorrsFormProps[]>([])
  // const [errores, setErrores] = useState({});

 
  const addError = (recivedMsg: string) => {
    const newError: ErorrsFormProps = {
      msg: recivedMsg, // Cambia este mensaje según tus necesidades
    };
    setErrorsStorage([...errorsStorage, newError]);
  };


  const cleanStates = () => {
    setSelectedDate(null)
    setSelectedFinishDate(null)
  }
  const [newItemFormItem,setNewItemFormItem] = useState<IGrupos>({
    // Default object state
    Title:"",
    codigo:0,
    denominacion:'',
    TipoGrupo: null,
    descripcion:'',
    Estado:false,
    fechaDeCreacion:new Date().toISOString(),
    fechaDeFinalizacion:null,
    defaultValues: true,
    ID:null,
    Pais:{TermGuid:paisSeleccionado?.data||'',Label:paisSeleccionado?.text||'',WssId:-1},
    Ciudad:{TermGuid:ciudadSeleccionada?.data||'',Label:ciudadSeleccionada?.text||'',WssId:-1},
    Ambito:{TermGuid:ambitoSeleccionada?.data||'',Label:ambitoSeleccionada?.text||'',WssId:-1},
    sectorAsociadoId:null,

    
  });

  const onSubmit: SubmitHandler<IGrupos> = data => setNewItemFormItem(data);
  // const onSubmit = (data:Inputs) => {
  //   console.log(data);
  // };
  console.log(watch("example","titulo")) 

  

  //STATES
  // const [sectores,setSectores] = useState <ISector[]>([]);
  // const [sectoresDesplegable,setSectoresDesplegable]  = useState <IDropdownOption[]>([])
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  useEffect(() => {

   reset()
  },[newItemFormItem])


  
  
  useEffect(() => {

    // aqui comprobamos que el haveuserpermissions es false y si es false ponemos el formulario vacio
    // haveReadPerms === true ? grupo = : null;
    
    const get = async () => {


      const datosOtroTipo = await SectorFunctions.getSectors();
    

      const opciones = datosOtroTipo.map((otroTipo) => ({
        key: otroTipo.ID, // Convierte 'id' a cadena si es necesario.
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
      console.log(groupOptions)
      // console.log(tipoGrupos)
       
    }

    get().then((items)=>console.log(items)).catch(console.error)

    // en vex de full control auqi tengo que poner el de comprobar los permisos de read
    setHaveReadPerms(Functions.checkFullControlPermission(context))

   
    
  },[])



  
  // end testing form

 

  // useEffect(() => {

   
  //   // setDate(new Date())
  //   const insetNewItem = async () => {

  //     // const data = new Date();
  //     const item : IGrupos= {
  //       Title:"Title",
  //       // id:2,
  //       codigo:2,
  //       // sector:"sector",
  //       denominacion:"denominacion",
  //       // descripcion:"descripcion",
  //       // fechaDeCreacion:data,
  //       TipoGrupo:"TipoGrupo",
  //       // ubicacion:"ubicacion",
  //       Estado: true,
  //       defaultValues: false
  //     }

  //    await GroupFunctions.addNewGroups(item)


  //   }
  //   insetNewItem().then((news) =>{console.log(news)}).catch((error) =>console.log(error))
  //   // getSectorsFromApi().then((news) =>{console.log(news)}).catch((error) =>console.log(error))
  // },[])

  useEffect(() =>{

    console.log('validacion')
    console.log(paisSeleccionado)

    
    
  },[newItemFormItem])
  
  
  
  useEffect(() =>{
    
    // console.log(context.pageContext)
   
    const gett = async () => {

    
      // comprobar que el item que se intenta mofificar no ha sido modificado por otro usuario previamente
      const hola =  await GroupFunctions.checkItemModified(2,context.pageContext.user.displayName)
      console.log(hola)
    }


    gett().then((news) =>{console.log(news)}).catch((error) =>console.log(error))
    
  },[newItemFormItem])


  // handlers
  const handleSector = (_: unknown,value:IDropdownOption):void => {

    setSector(value)
    console.log(sector)

    sector !== undefined ? setSector(value) : console.log('no existe aun')
    // console.log(date)
    
  }
  const handlePais = (_: unknown,value:IDropdownOption):void=> {
    
    setPaisSeleccionado(value)
    console.log(value)
    
  }

  const handleCiudad = (_: unknown,value:IDropdownOption):void => {
    setCiudadSeleccionada(value)
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

  
  // upload files
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
    console.log(file)
  };

  useEffect(() =>{


    // sectores.map((sector) =>{
    //   categories.push({key:sector.Denominacion,text:sector.Denominacion})
    // })

    // console.log(sectores)

    console.log(newItemFormItem)
    const insetNewItem = async () => {

      try {

        const itemExiste = await GroupFunctions.getGroupByName(newItemFormItem?.denominacion)
        
        if (itemExiste > 0) {
         
          setTitleExist(true)
          addError('El titulo del grupo ya existe en la lista.')
        } else{
          
          console.log(newItemFormItem.Ciudad)
          // asigno aqui las propiedades porq si no no me las pilla
          newItemFormItem.Ciudad = {TermGuid:ciudadSeleccionada?.data,Label:ciudadSeleccionada?.text,WssId:-1}
          newItemFormItem.Pais= {TermGuid:paisSeleccionado?.data,Label:paisSeleccionado?.text,WssId:-1}
          newItemFormItem.TipoGrupo=tipoGrupo.text

          // control de fecha
          if(selectedDate != null){newItemFormItem.fechaDeCreacion = selectedDate.toISOString()}
          else{
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString()
            newItemFormItem.fechaDeCreacion = formattedDate
          
          }


          selectedFinishDate ? newItemFormItem.fechaDeFinalizacion = selectedFinishDate.toISOString()  : null

          const  sectorKeyNumberFormat: number = parseInt(sector?.key.toString())
          // sector != undefined ? newItemFormItem.sectorAsociado = {ID:1}:null

          estado === true ? newItemFormItem.Estado = true: newItemFormItem.Estado= false;

          newItemFormItem.sectorAsociadoId = sectorKeyNumberFormat

          newItemFormItem.TipoGrupo = tipoGrupo.text
          
          await GroupFunctions.addNewGroups(newItemFormItem)

          const itemCreado = await GroupFunctions.getGroupByNames(newItemFormItem.Title)
          let id:number = null
          itemCreado.map((item) => {id = item.ID})
          // const items = await GroupFunctions.getGroupsById(id)
          if(selectedFile){await GroupFunctions.getGroupForAttachment(id,selectedFile)} else{null}
          // limpiar estados
          cleanStates()
           
         
          // await items.attachmentFiles.add('adada.text','dadas')
          setTitleExist(false)
        }

      } catch (error) {
        console.log(error)
      }
      
     


    }
    
    
    
    insetNewItem().then((news) =>{console.log(news)}).catch((error) =>console.log(error))
    // aqui tambien puedo poner para que se ejecute cuando cambia el estado del form en vez del item
  },[newItemFormItem])

  
  useEffect(() => {


    const testing = async () => {


      const ciudadesItem = await GroupFunctions.getTaxonomyTermsChildren('1e2cb030-5981-48aa-902f-2a338aa96107','2bc7e5fd-e09f-4fb1-87da-855111f5c1ea')
      const paisesItems = await GroupFunctions.getTaxonomyTermsChildren('2a569ff2-2fe6-458d-990a-a3f32001ab99','00d9c3fc-e8ba-4acd-a3b1-a81f8367aea4')
      const ambitosItems = await GroupFunctions.getTaxonomyTermsChildren('0a21538d-4770-44e7-9b33-a3c12e173c5d','7b28f990-5011-4c37-83d6-386c1c5c44b3')

      let ciudadesArray : IDropdownOption[] = []
      ciudadesItem.map((label)=>{

      
        ciudadesArray.push({key: '',
          text:'',data: label.id})
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

    testing().then((news) =>{console.log(news)}).catch((error) =>console.log(error))

  },[])
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredDate = new Date(event.target.value);
    setSelectedDate(enteredDate);
    console.log(enteredDate.toISOString())
  };

  const handleFinishDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredDate = new Date(event.target.value);
    setSelectedFinishDate(enteredDate);
    console.log(enteredDate.toISOString())
  };

  // const handleToggle = (event: any):boolean => {
  //   console.log(event.target)
    
  //   return true
  // };

  const onChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean)=> {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
    console.log(estado)
    checked ? setEstado(true) : setEstado(false);
   
    
  }



  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const buttonStackTokens: IStackTokens = {
    childrenGap: 8, // Espacio entre los botones
  };
  const stackTokens: IStackTokens = { childrenGap: 20 };
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="create-group">
   
      
    {titleExist === true ? <Alert intent="error" action="Retry">
      El titulo ya existe
      {/* aqui hay que poner un valor que vaya cambiando en funcion del error que haya en el form con un state qeue tenga un string con el error */}
    </Alert> : null}
    {haveReadPerms !== true ? <Alert intent="error" action="Retry">
      El usuario actual no tiene permisoss de lectura en este elemento
      
    </Alert> : null}
    <form onSubmit={handleSubmit(onSubmit)}>
    <Stack horizontal tokens={stackTokens}>
      
    
    <Stack.Item grow={1}>
   
    {/* <Field label="Titulo">
        <input type="text" placeholder="Titulo del grupo" required={true} {...register("Title")} value={grupo?.Title}/>
      </Field> */}
      <Field label="Denominación del grupo">
      <input type="text" placeholder="Denominación del grupo" required={true} {...register("denominacion")} value={grupo?.denominacion}/>
      </Field>
      {/* <Field label={"Codigo de grupo"} title="codigo">
        <input type="text" name="codigo" {...register("codigo")} value={grupo?.codigo}/>
      </Field> */}
      <Field label="Descripcion">
        <textarea placeholder="Descripción del sector"  name="descripcion" {...register("descripcion")} value={grupo?.descripcion}/>
      </Field>
      <Field label='Fecha de creación'>
        <input type="date"   name="fechaDeCreacion" onChange={handleDateChange}/>
      </Field>

      <Field label='Fecha de finalización'>
        <input type="date"  name="fechaFinalizacion" onChange={handleFinishDateChange} />
      </Field>

      <Toggle label="Estado" onText="Activo" offText="Inactivo" onChange={onChange}  />
      
      </Stack.Item>

      {/* Columna 2 */}
      
      <Stack.Item grow={1}>
      
        {/* Contenido de la segunda columna */}
        
        <Stack horizontal tokens={buttonStackTokens}>
        <PrimaryButton>Botón 1</PrimaryButton>
        <PrimaryButton>Botón 2</PrimaryButton>
        <PrimaryButton>Botón 3</PrimaryButton>
      </Stack>
      <Field label='Sector'>
      <Dropdown
        placeholder="Seleccione un sector"
        
        options={sectorOptions}
        required={true}
        // {...register("sectorAsociado")}
        onChange={handleSector.bind(this)}
        // selectedKey={category?.key}
        // selectedKey={grupo?.sector.Denominacion}
        
      />
      </Field>

      <Field label='Tipo de grupo'>
      <Dropdown
        placeholder="Seleccione un grupo"
        options={groupOptions}
        // {...register("tipoGrupo")}
        onChange={handleTipoGrupo}
        selectedKey={tipoGrupo?.key}
        
      />
      </Field>


      <Field label='Temática'>
      <Dropdown
        placeholder="Seleccione una temática"
        defaultValue={'a'}
        options={categories}
        onChange={()=>handleSector}
        
        
      />
      </Field>

      <Field label='País'>
      <Dropdown
        placeholder="Seleccione un país"
        defaultValue={paisSeleccionado?.text}
        options={paisesOptions}
        // selectedKey={paisSeleccionado?.key}
        defaultSelectedKey={paisSeleccionado?.key}

        onChange={handlePais.bind(this)}
        // {...register("Pais")}
      />
      </Field>

      <Field label='Ciudad'>
      <Dropdown
        placeholder="Seleccione una ciudad"
        
        options={ciudadesOptions}
        // selectedKey={ciudadSeleccionada?.text}
        {...register("Ciudad")}
        defaultSelectedKey={'Palencia'}
        onChange={handleCiudad}
        
      />
      </Field>
      <Field label='Ambito'>
      <Dropdown
        placeholder="Selecciona uno o varios ambitos"
        
        options={ambitosOptions}
        // selectedKey={ciudadSeleccionada?.text}
        // {...register("Ciudad")}
        // defaultSelectedKey={'Palencia'}
        onChange={handleAmbito}
        
      />
      </Field>


      <Field label='Adjuntos'>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' , width: '50%'}}
        onChange={handleFileChange}
      />
      <PrimaryButton onClick={handleButtonClick}>Examinar archivo</PrimaryButton>
        
        
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      </Field>
      {/* include validation with required or other standard HTML validation rules */}
      {/* <input {...register("exampleRequired", { required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      
      
      <PrimaryButton type="submit">Guardar</PrimaryButton>
      
      </Stack.Item>
      
    </Stack>
      </form>
    
  
    </div>
  );



}