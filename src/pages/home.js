import { useState, useEffect } from 'react';
import Nav from '../components/navLog'; 
import axios from 'axios';

var data = {"title":"Titulo", "descripcion":"Descripcion", "contacto":"xxxx-xxxxxxx"};

function Home() { 

  const [title, setTitle] = useState(data.title);
  const [descripcion, setDescripcion] = useState(data.descripcion);
  const [contacto, setContacto] = useState(data.contacto);
  var empresa_id = JSON.parse(localStorage.getItem("userData") || [{"id_empresa":0}])[0].empresa_id;

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

  return (
      <div>
        <Nav/>
        <div className='about wordWrap'>
          <div className='center padinT'>
            <h1>{title}</h1>
            <h5 className='p-0 m-0'>{descripcion}</h5>
          </div>
        </div>

        <div className='footer center'>
          <h2>Contacto</h2>
          <p className='p-0 m-0 d-inline'>{contacto}</p>
        </div>
      </div>
  );
}

export default Home;
