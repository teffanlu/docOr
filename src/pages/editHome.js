import { useState, useEffect } from 'react';
import Nav from '../components/navLog'; 
import axios from 'axios';

var data = {"title":"Titulo", "descripcion":"Descripcion", "contacto":"xxxx-xxxxxxx"};

function EditHome() {  

  const [title, setTitle] = useState(data.title);
  const [descripcion, setDescripcion] = useState(data.descripcion);
  const [contacto, setContacto] = useState(data.contacto);
  var empresa_id = JSON.parse(localStorage.getItem("userData") || [{"id_empresa":0}])[0].id_empresa;

  const [stateH1, setStateH1] = useState(true);
  const [stateH5, setStateH5] = useState(true);
  const [pContact, setpContact] = useState(true);

  const [control, setControl] = useState(true);

  useEffect(() => {

    async function getData(){
      try {
        let res = await axios.get('http://localhost:4000/api/info/'+empresa_id);
        console.log(res.data[0]);

        if(res.data.length > 0){
          data = {"title":res.data[0].title, "descripcion":res.data[0].descripcion, "contacto":res.data[0].contacto};
          setTitle(res.data[0].title);
          setDescripcion(res.data[0].descripcion);
          setContacto(res.data[0].contacto);
        }

      } catch (err) {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      } finally {
        //
      }
    }

    getData();

  }, []);

  async function SaveCambio() {

    data = {title, descripcion, contacto};
    console.log(data);

    setControl(!control);

    try {
      let response = await axios.post('http://localhost:4000/api/info/'+empresa_id, {
        title, 
        descripcion, 
        contacto
      });
      console.log(response);
    } catch (err) {
      console.log(err.response.data.message);
      alert("404");
    } finally {
      //
    }
  }

  return (
      <div>
        <Nav/>
        <div className='about wordWrap'>

        <div className=''>
          { title !== data.title || descripcion !== data.descripcion || contacto !== data.contacto ?
            <button type="button" onClick={() => {SaveCambio();}} className="btn btn-primary p-0 m-0 mb-1 float-end">
              <h3 className="m-0 text-info"> Guardar Cambios 💾</h3>
            </button>
            :
            null
          }
        </div>
        
        <div className='center padinT'>
          {
            stateH1 ?
              <div className="m-0 p-0">
                <h1 className='p-0 m-0 d-inline'>{title}</h1>
                <button type="button" onClick={() => {setStateH1(!stateH1); console.log(data)}} className="btn btn-secondary p-0 m-0 mb-3">✏️</button>
              </div>
            :
              <div className="m-0 p-0">
                Titulo: 
                <input onChange={(e) => setTitle(e.target.value)} value={title}></input>
                <button type="button" onClick={() => {setStateH1(!stateH1);}} className="btn btn-secondary p-0 m-0 mb-1">✔️</button>
                <button type="button" onClick={() => {setTitle(data.title); setStateH1(!stateH1);}} className="btn btn-secondary p-0 m-0 mb-1">❌</button>
              </div>
          }
          {
            stateH5 ?
              <div className="m-0 p-0">
                <h5 className='p-0 m-0 d-inline'>{descripcion}</h5>
                <button type="button" onClick={() => {setStateH5(!stateH5);}} className="btn btn-secondary p-0 m-0 mb-3">✏️</button>
              </div>
            :
              <div className="m-0 p-0">
                Descripcion: 
                <input onChange={(e) => setDescripcion(e.target.value)} value={descripcion}></input>
                <button type="button" onClick={() => {setStateH5(!stateH5);}} className="btn btn-secondary p-0 m-0 mb-1">✔️</button>
                <button type="button" onClick={() => {setDescripcion(data.descripcion); setStateH5(!stateH5);}} className="btn btn-secondary p-0 m-0 mb-1">❌</button>
              </div>
          }
        </div>

        </div>
        <div className='footer center'>
          <h2>Contacto</h2>
          {
            pContact ?
              <div className="m-0 p-0">
                <p className='p-0 m-0 d-inline'>{contacto}</p>
                <button type="button" onClick={() => {setpContact(!pContact);}} className="btn btn-secondary p-0 m-0 mb-3">✏️</button>
              </div>
            :
              <div className="m-0 p-0">
                Contacto: 
                <input onChange={(e) => setContacto(e.target.value)} value={contacto}></input>
                <button type="button" onClick={() => {setpContact(!pContact);}} className="btn btn-secondary p-0 m-0 mb-1">✔️</button>
                <button type="button" onClick={() => {setContacto(data.contacto); setpContact(!pContact);}} className="btn btn-secondary p-0 m-0 mb-1">❌</button>
              </div>
          }
        </div>
      </div>
  );
}

export default EditHome;