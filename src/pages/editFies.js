import { useState, useEffect } from 'react';
import Nav from '../components/navLog';
import axios from 'axios';

var admin_id = {};

const EditFiles = () => {

  const User = JSON.parse(localStorage.getItem("userData") || '{"name": "default"}')[0];
  var rol = JSON.parse(localStorage.getItem("rol") || '{"none":false}');

  const [title1, setTitle1] = useState('titulo');
  const [title3, setTitle3] = useState(null);
  const [title5, setTitle5] = useState('descripcion');

  const [stateH1, setStateH1] = useState(true);
  const [stateH3, setStateH3] = useState(true);
  const [stateH5, setStateH5] = useState(true);

  const [data, setData] = useState([]);
  const [Get, setGet] = useState(true);

  useEffect(() => {

    if(rol.admin === true){
      admin_id = User.id_admin;
    }
    if(rol.empleado === true){
      admin_id = User.admin_id;
    }

    console.log(admin_id);

    async function getData () {
      
      try {
        let response = await axios.get('https://docor-api.herokuapp.com/api/info/archivo/'+admin_id);
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        console.log(err.response.data.message);
      } finally {
        //
      }
      
    }
    getData();
    
  }, [Get]);

  async function eliminar (i, id) {
    data.splice(i, 1);
    await setData([...data]);

    try {
      await axios.delete('https://docor-api.herokuapp.com/api/info/archivo/'+id);
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      //
    }

  }

  async function NewDiv (tipo) {

    if(tipo === "titulo"){
      if(title1 !== ""){
        console.log(tipo + ": "+ title1);
        await setData([...data, {"titulo":title1}]);
        try {
          await axios.post('https://docor-api.herokuapp.com/api/info/archivo2/'+admin_id, {
            titulo : title1
          });
        } catch (err) {
          console.log(err.response.data.message);
        } finally {
          //
        }
      }
    }
    if(tipo === "archivo"){ 
      if(title3 !== null){
        var bodyFormData = new FormData();
        bodyFormData.append('archivo', title3);
        
        console.log(tipo + ": "+ title3);
        //funcion para subir el archivo y retornar la direccion url

        try {
          let response = await axios({
            method: "post",
            url: 'https://docor-api.herokuapp.com/api/info/archivo/'+admin_id,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          });

          console.log(response);
          
        } catch (err) {
          console.log(err.response.data.message);
          alert("404");
        } finally {
          //
        }

      }
    }
    if(tipo === "descripcion"){
      if(title5 !== ""){
        console.log(tipo + ": "+ title5);
        await setData([...data, {"descripcion": title5}]);
        try {
          await axios.post('https://docor-api.herokuapp.com/api/info/archivo2/'+admin_id, {
            descripcion : title5
          });
        } catch (err) {
          console.log(err.response.data.message);
        } finally {
          //
        }
      }
    }

    setGet(!Get);
  }

  return (
    <>
      <Nav/>
      <div className='about padin'>

        { data.length >= 1 ?
          data.map((div, i) =>
            <div key={i} className='CardBody mb-4 wordWrap'>
              <button type="button" onClick={() => eliminar(i, div.id_archivo)} className="btn btn-secondary btn-rounded float-end">❌</button>
              <h1>{div.titulo}</h1>
              <h5>{div.descripcion}</h5>
              <h3>{div.tituloFile}</h3> 
              <a target='_blank' rel="noreferrer" href={div.file}>{div.file}</a>
            </div>
          )
          :
          null
        }

        <div className='prueba CardBody mb-4'>
          {
            stateH1 ?
              <div className="m-0 p-0">
                <h1 className='p-0 m-0 d-inline'>Titulo</h1>
                <button type="button" onClick={() => {setStateH1(!stateH1); setTitle1('');}} className="btn btn-secondary p-0 m-0 mb-3">➕</button>
              </div>
            :
              <div className="m-0 p-0">
                Titulo: 
                <input onChange={(e) => setTitle1(e.target.value)} value={title1}></input>
                <button type="button" onClick={() => {setStateH1(!stateH1); NewDiv("titulo");}} className="btn btn-secondary p-0 m-0 mb-1">✔️</button>
                <button type="button" onClick={() => {setTitle1(''); setStateH1(!stateH1);}} className="btn btn-secondary p-0 m-0 mb-1">❌</button>
              </div>
          }
          {
            stateH5 ?
              <div>
                <h5 className='p-0 m-0 d-inline'>Texto</h5>
                <button type="button" onClick={() => {setStateH5(!stateH5); setTitle5('');}} className="btn btn-secondary p-0 m-0 mb-1">➕</button>
              </div>
            :
              <div>
                Texto: 
                <input onChange={(e) => setTitle5(e.target.value)} value={title5}></input>
                <button type="button" onClick={() => {setStateH5(!stateH5); NewDiv("descripcion");}} className="btn btn-secondary p-0 m-0 mb-1">✔️</button>
                <button type="button" onClick={() => {setTitle5(''); setStateH5(!stateH5);}} className="btn btn-secondary p-0 m-0 mb-1">❌</button>
              </div>
          }    
          {
            stateH3 ?
              <div>
                <h2 className='p-0 m-0 d-inline'>Subir archivo</h2>
                <button type="button" onClick={() => {setStateH3(!stateH3); setTitle3(null);}} className="btn btn-secondary p-0 m-0 mb-2">📤</button>
              </div>
            :
              <div>
                Subir archivo: 
                <input type="file" onChange={(e) => setTitle3(e.target.files[0])}></input>
                <button type="button" onClick={() => {setStateH3(!stateH3); NewDiv("archivo");}} className="btn btn-secondary p-0 m-0 mb-1">✔️</button>
                <button type="button" onClick={() => {setTitle3(null); setStateH3(!stateH3);}} className="btn btn-secondary p-0 m-0 mb-1">❌</button>
              </div>
          }   
        </div>
        
      </div>
    </>
  );
};

export default EditFiles;
