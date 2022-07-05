import { useState, useEffect } from 'react';
import Nav from '../components/navLog';
import axios from 'axios';

var admin_id = {};

const Files = () => {

  const User = JSON.parse(localStorage.getItem("userData") || '{"name": "default"}')[0];
  var rol = JSON.parse(localStorage.getItem("rol") || '{"none":false}');

  const [data, setData] = useState([]);

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
        let response = await axios.get('http://localhost:4000/api/info/archivo/'+admin_id);
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        console.log(err.response.data.message);
      } finally {
        //
      }
      
    }
    getData();
    
  }, []);

  return (
    <>
      <Nav/>
      <div className='about padin'>

        { data.length >= 1 ?
          data.map((div, i) =>
            <div key={i} className='CardBody mb-4 wordWrap'>
              <h1>{div.titulo}</h1>
              <h5>{div.descripcion}</h5>
              <h3>{div.tituloFile}</h3> 
              <a target='_blank' rel="noreferrer" href={div.file}>{div.file}</a>
            </div>
          )
          :
          null
        }
      </div>
    </>
  );
};

export default Files;
