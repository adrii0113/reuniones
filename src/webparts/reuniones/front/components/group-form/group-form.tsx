import * as React from "react"
import { useState, useEffect } from "react";

import { useForm, SubmitHandler  } from "react-hook-form";
// FUNCTIONS
import { GroupFunctions } from "../../../functions/GroupFunctions";
// import { SectorFunctions } from "../../../functions/SectorFunction";
import { Functions } from "../../../utils/functions";

// FLUENT UI
import {
 
  Dropdown
} from "@fluentui/react"
import type { IDropdownOption } from "office-ui-fabric-react";



// PNP CONTROLS
// import { TaxonomyPicker } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";


// TESTING
// import type { WebPartContext } from "@microsoft/sp-webpart-base";

// interface IUseSP {
//   context: WebPartContext;
// }

// const SPContext = React.createContext(null);

// const useSP = (): IUseSP => React.useContext(SPContext);
// END TESTING



type Inputs = {
    example: string,
    exampleRequired: string,
    Title: string,
    denominacion: string,
    codigo: number,
    id?:number,
    sector?:IDropdownOption,
    nombre: string,
    descripcion: string,
    fechaCreacion: string,
    fechaFinalizacion: string,
    estado: boolean,
    tipoGrupo: IDropdownOption,
    adjunto:File
  };
// import { IGroupForm } from "./IGroupForm";
import { Field } from "@fluentui/react-components";
import { IGrupos } from "../../../interfaces/IGrupos";
// import { ISector } from "../../../interfaces/ISector";

const categories :IDropdownOption[] = [
  {key: "transporte", text: "Transporte"},
  {key: "comercio", text: "Comercio"},
  {key: "educacion", text: "Educacion"},
  {key: "construccion", text: "Construccion"},
]

interface GroupFormProps {
  grupo?: IGrupos;
}

export function GroupForm ({ grupo }: GroupFormProps){

  
  const [date] = useState(Functions.dateFormat())
  // USE FOORM CONFIG
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  // const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  const [sector, setSector] = useState <IDropdownOption>()
  const [adjuntos] = useState<File>()
  const [newItemFormItem, setNewItemFormItem] = useState<IGrupos>({
    // Default object state
    Title:"",
    codigo:0,
    denominacion:'',
    TipoGrupo: '',
    descripcion:'',
    Estado:true,
    fechaDeCreacion:date,
    defaultValues: true,
    ID:null,
    // sector:{ID:0,Denominacion:'',CodigoSector:0},
    adjuntos:adjuntos

  });
  const onSubmit: SubmitHandler<IGrupos> = data => setNewItemFormItem(data);
  console.log(watch("example","titulo")) 

  // const { context } = useSP();

  //STATES
  // const [sectores,setSectores] = useState <ISector[]>([]);
  // const [sectoresDesplegable,setSectoresDesplegable]  = useState <IDropdownOption[]>([])
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
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


  // handlers
  const handleSector = (_: unknown,value:IDropdownOption) => {

    setSector(value)

    sector !== undefined ? setSector(value) : console.log('no existe aun')
    // console.log(date)
    
  }
  // upload files
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() =>{


    // sectores.map((sector) =>{
    //   categories.push({key:sector.Denominacion,text:sector.Denominacion})
    // })

    // console.log(sectores)

    console.log(newItemFormItem)
    const insetNewItem = async () => {

      // const data = new Date();
      // const item : IGrupos= {
      //   Title:"Title",
      //   // id:2,
      //   codigo:2,
      //   // sector:"sector",
      //   denominacion:"denominacion",
      //   // descripcion:"descripcion",
      //   // fechaDeCreacion:data,
      //   TipoGrupo:"TipoGrupo",
      //   // ubicacion:"ubicacion",
      //   Estado: true,
      //   defaultValues: false
      // }

      
      
     await GroupFunctions.addNewGroups(newItemFormItem)


    }
    insetNewItem().then((news) =>{console.log(news)}).catch((error) =>console.log(error))
  },[newItemFormItem])
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="create-group">
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <Field label="Titulo">
        <input type="text" placeholder="Titulo del grupo" required={true} {...register("Title")} value={grupo?.Title}/>
      </Field>
      <Field label="Denominación del grupo">
      <input type="text" placeholder="Denominación del grupo" required={true} {...register("denominacion")} value={grupo?.denominacion}/>
      </Field>
      <Field label={"Codigo de grupo"} title="codigo">
        <input type="text" name="codigo" {...register("codigo")} value={grupo?.codigo}/>
      </Field>
      <Field label="Descripcion">
        <textarea placeholder="Descripción del sector"  name="descripcion" {...register("descripcion")} value={grupo?.descripcion}/>
      </Field>

      <Field label='Fecha de creación'>
        <input type="date" value={grupo?.fechaDeCreacion || Functions.isoDate(date)}  name="fechaCreacion" {...register("fechaCreacion")} />
      </Field>

      
      <Field label='Fecha de finalización'>
        <input type="date"  name="fechaFinalizacion" {...register("fechaFinalizacion")} value={grupo?.fechaDeCreacion}/>
      </Field>

      <Field label='Sector'>
      <Dropdown
        placeholder="Seleccione un sector"
        
        options={categories}
        onChange={handleSector}
        // selectedKey={category?.key}
        {...register("sector")}
        // selectedKey={grupo?.sector.Denominacion}
        
      />
      </Field>

      <Field label='Tipo de grupo'>
      <Dropdown
        placeholder="Seleccione un grupo"
        
        options={categories}
        onChange={handleSector}
        // selectedKey={category?.key}
        selectedKey={grupo?.TipoGrupo}
      />
      </Field>


      <Field label='Temática'>
      <Dropdown
        placeholder="Seleccione una temática"
        
        options={categories}
        onChange={handleSector}
        
        
      />
      </Field>
      
      {/* <Field>
      <TaxonomyPicker allowMultipleSelections={true}
                termsetNameOrID="Countries"
                panelTitle="Select Term"
                label="Taxonomy Picker"
                context={context as any}
                // onChange={this.onTaxPickerChange}
                isTermSetSelectable={false} />
      </Field> */}

      <Field label='Adjuntos'>
        <input type="file" onChange={handleFileChange}/>
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      </Field>
      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input type="submit" />
    </form>
  
    </div>
  );



}