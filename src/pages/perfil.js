import React, { useEffect } from 'react';
import Nav from '../components/navLog';
import Sec from '../components/security'; 
import {useNavigate} from 'react-router-dom';

function Perfil() {
  const navigate = useNavigate();

  useEffect(() => {

    Sec(navigate);
    
  }, []);

  var rol = JSON.parse(localStorage.getItem("rol") || '{"none":false}');
  var data = JSON.parse(localStorage.getItem("userData") || ['{"none":false}'])[0];

  return (
      <div>
        <Nav/>
        <div className='about padin'>
        { rol.empleado === true ?
          <>
          <div className='d-flex'>
            <h1>👨‍💻</h1>
            <div className='separatorPerfilName' />
            <h3>{data.nombre}</h3>
          </div>
          <div className='d-flex'>
            <h3>Email: </h3>
            <div className='separatorPerfil' />
            <h5>{data.email}</h5>
          </div>
          <div className='d-flex'>
            <h3>Cargo: </h3>
            <div className='separatorPerfil' />
            <h5>{data.cargo}</h5>
          </div>
          </>
          :
          rol.admin === true ?
          <>
          <div className='d-flex'>
            <h1>👨‍💼</h1>
            <div className='separatorPerfilName' />
            <h3>{data.nombre}</h3>
          </div>
          <div className='d-flex'>
            <h3>Email: </h3>
            <div className='separatorPerfil' />
            <h5>{data.email}</h5>
          </div>
          </>
          :
          rol.empresa === true ?
          <>
            <div className='d-flex'>
              <h1>🏢</h1>
              <div className='separatorPerfilName' />
              <h2>{data.nombre}</h2>
            </div>
            <div className='d-flex'>
              <h3>Email: </h3>
              <div className='separatorPerfil' />
              <h5>{data.email}</h5>
            </div>
          </>
          :
          null
        }
        </div>
      </div>
  );
}

export default Perfil;
