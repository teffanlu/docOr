import React, {useState, useEffect} from 'react';

import Login from '../components/login';
import RegisterBusiness from '../components/registerBusiness';

function LandingPage() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  useEffect(() => {

    localStorage.removeItem("rol");
    localStorage.removeItem("userData");

  }, []);

  function Body() {
    return (
      <div>
        {/* about */}
        <div className='about padinT'>
          <h1 className='text-center'>Bienvenido a DocOr</h1>
          <figure className="text-center">
            <blockquote className="blockquote">
              <p className="mb-0">Plataforma dedicada para ambientes de trabajo en equipo. Organiza y documenta los trabajos de una forma ligera y accesible.</p>
            
            </blockquote>
            {/*
            <figcaption className="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </figcaption>
            */}
          </figure>
        </div>
        {/* info */}
        <div className='info'>
          <h1 className='text-center'>Información</h1>
          <figure className="text-center">
            <blockquote className="blockquote">
              <p className="mb-0">Creado y dirigido por un único administrador, autorizado por la empresa en función.</p>
            
            </blockquote>
            <figcaption className="blockquote-footer">
              Inicie sesión para comenzar las labores dentro del equipo asignado
            </figcaption>
          </figure>
        </div>
        {/* footer */}
        <div className='footer'>
          <h1 className='text-center'>Contacto</h1>
          <figure className="text-center">
            <blockquote className="blockquote">
              <p className="mb-0">Gmail: organizeddoc@gmail.com</p>
            
            </blockquote>
            <figcaption className="blockquote-footer">
              Creadora: <cite title="Source Title"> Teffany Paola Luzardo Añez </cite>
            </figcaption>
          </figure>
        </div>
      </div>
    );
  }

  return (
      <div>
        {/* Navbar */}
        <div className='bar'>
            <div className='log'>
                <h2 role="button" onClick={() => {setLogin(false); setRegister(false)}}>DocOr 📚</h2>
            </div>
            <div className='items'>
                <button 
                  type="button" 
                  className="item btn btn-dark" 
                  onClick={() => {setLogin(!login); setRegister(false)}}
                >
                  Login
                </button>
                <button 
                  type="button" 
                  className="item btn btn-dark" 
                  onClick={() => {setRegister(!register); setLogin(false)}}
                >
                  Started get
                </button>
            </div>
        </div>

        {
          login ?
          <Login/>
          :
          register ?
          <RegisterBusiness/>
          :
          <Body/>
        }
      
      </div>
  );
}

export default LandingPage;
