import React, { useState, useEffect } from 'react';
import Nav from '../components/navLog';
import axios from 'axios';
import Sec from '../components/security'; 
import {useNavigate} from 'react-router-dom';

import RegisterEmployee from '../components/registerEmployee';

var admin_id = {};

function Chat() {
  const navigate = useNavigate();

  const [register, setRegister] = useState(true);
  const [Get, setGet] = useState(true);
  const [Message, setMessage] = useState("");
  const User = JSON.parse(localStorage.getItem("userData") || '{"name": "default"}')[0];
  const [list, setList] = useState([{nombre: '...', cargo: ".."}]);
  const [data, setdata] = useState([{nombre: '...', mensaje: "... ...", date: "../../../", time: ".."}]);

  var rol = JSON.parse(localStorage.getItem("rol") || '{"none":false}');

  useEffect(() => {

    Sec(navigate);

    if(rol.admin === true){
      admin_id = User.id_admin;
    }
    if(rol.empleado === true){
      admin_id = User.admin_id;
    }

    async function getData () {

      try {
        let response = await axios.get('http://localhost:4000/api/users/'+admin_id);
        console.log(response.data);
        setList(response.data);
      } catch (err) {
        console.log(err.response.data.message); 
        alert("404");
      } finally {
        //
      }

    }
    getData();

    async function getMen () {

      try {
        let response = await axios.get('http://localhost:4000/api/info/mensaje/'+admin_id);
        console.log(response.data);
        setdata(response.data);
      } catch (err) {
        console.log(err.response.data.message); 
        alert("404");
      } finally {
        //
      }

    }
    getMen();

  }, [Get]);

  const onFinish = async () => {
    if(Message === ""){
      //nada
    } else {
      var nowId = Date.now();
      var now = new Date(nowId);
      var date = now.getDate() + '/' + ( now.getMonth() + 1 ) + '/' + now.getFullYear();
      var time = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

      var message = {nombre: User.nombre, mensaje: Message, time, date, admin_id: User.admin_id };

      try {
        let response = await axios.post('http://localhost:4000/api/info/mensaje/'+admin_id, message);
        console.log(response.data);
      } catch (err) {
        console.log(err.response.data.message); 
        alert("404");
      } finally {
        //
      }
      
    }
    setMessage("");
    setGet(!Get);
  };

  /*function actualizarPagina () {
    for (let i = 0; i < -1; i++) {

      setGet(!Get);
    }
  }*/

  async function deleteEmpleado (id) {
    try {
      await axios.delete('http://localhost:4000/api/users/empleado/'+id);
    } catch (err) {
      console.log(err.response.data.message); 
      alert("Error");
    } finally {
      //
    }
    setGet(!Get);
  }
 
  function Miembros () {
    
    return (
      <>
        { rol.admin === true ? //Habilitado cuando sea admin
          <div className='text-center'>
            <button 
              type="button" 
              className="item btn btn-success" 
              onClick={() => setRegister(!register)}
            >
              Agregar nuevo miembro ➕
            </button>
          </div>
          :
          null
        }
        
        <ul className="list-unstyled mb-0">
          { list.length >= 1 ?
            list.map((div, i) =>
            <li key={i} className="p-2 border-bottom">
              <a href='/chat#' className="text-decoration-none">
              <div className="">
                <div className="pt-1">
                  { rol.admin === true ? //Habilitado cuando sea admin
                    <button type="button" onClick={() => deleteEmpleado(div.id_empleado)} className="btn btn-secondary btn-rounded float-end">❌</button>
                    :
                    null
                  }
                  <p className="fw-bold mb-0 ">{div.nombre}</p>
                  <p className="small text-muted">{div.cargo}</p>
                </div>
              </div>
              </a>
            </li>
            )
            :
            null
          }
        </ul>
      </>
    );
  }

  function Messages () {

    return (
      <ul className="list-unstyled m-0 chat-scroll-container">
        { data.length >= 1 ?
          data.map((div, i) =>
          <li key={i}>
            <div className="card">
              <div className="card-header d-flex justify-content-between pl-3">
                <p className="fw-bold mb-0">{div.nombre}</p>
                <p className="text-muted small mb-0"><i className="far fa-clock"></i>{div.time} - {div.date}</p>
              </div>
              <div className="card-body">
                <p className="mb-0">
                  {div.mensaje}
                </p>
              </div>
            </div>
          </li>
          )
          :
          null
        }
      </ul> 
    );
  }

  return (
      <div className='chatConfig'>
        <Nav/>
        { register ?
        <div className='about padin'>
          <section>
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-lg-5 col-xl-4 p-0 mb-4 mb-md-0">
                  <h5 className="font-weight-bold mb-3 text-center text-lg-start prueba">Miembros</h5>
                  <div className="">
                    <div className="chat-scroll-container">

                      <Miembros/>

                    </div>
                  </div>
                </div>

                <div className="card-body col-md-6 col-lg-7 p-0 col-xl-8">
                <h5 className="font-weight-bold mb-3 text-center text-lg-start prueba">Chat</h5>

                  <Messages/>

                </div>
              </div>
              <div>
                <div className="form-outline mt-2">
                  <textarea className="form-control" id="textAreaExample2" rows="2" value={Message}
                    onChange={(e)=> setMessage(e.target.value)}
                  ></textarea>
                  <p className="m-0 d-inline">Message</p>
                  <button type="button" className="btn btn-success btn-rounded float-end"
                    onClick={() => onFinish()}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        :
        <RegisterEmployee/>
        }
      </div>
  );
}

export default Chat;
