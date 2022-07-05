import React, { useEffect } from 'react';
import Dropdown from 'react-dropdown';
import {useNavigate} from 'react-router-dom';
import 'react-dropdown/style.css';

const options = [
    'Ver perfil', 'Logout'
];

function dropdw(e, navigate){
    console.log(e);
    if(e === "Logout"){
        navigate('/');
    }
    if(e === "Ver perfil"){
        navigate('/perfil');
    }
    if(e === "Logout"){
        navigate('/');
    }
}

function Nav() {
    const navigate = useNavigate();

    var rol = {"empresa":false, "admin":false, "empleado":false};
    var val = JSON.parse(localStorage.getItem("rol") || '{"none":false}');

    if(val.none === undefined){
        if(val.empresa)
            rol.empresa = true;

        if(val.admin)
            rol.admin = true;

        if(val.empleado)
            rol.empleado = true;
                
        if(val.empresa === false || val.admin === false || val.empleado === false)
            navigate('/');
        
    }else{
        navigate('/');
    }

    return (
      <div>
        { rol.empresa === true ? /* Navbar Empresa*/
        <div className='bar'>
            <div className='logo items'>
                <h2 className='m-0' role="button" onClick={() => navigate('/editHome')}>DocOr 📚</h2>
                <h1 className="pl m-0">|</h1>
                <div className="itemnav">
                    <a className="nav-link decorationItem" href="/editHome">Home</a>
                </div>
                <div className="itemnav">
                    <a className="nav-link decorationItem" href="/listarAdmin">Admins</a>
                </div>
            </div>
            <div className='items'>
                <Dropdown className='m-0 p-0 marpario' onChange={(e) => dropdw(e.value, navigate)} options={options} placeholder='Perfil'/>
            </div>
        </div>
        : rol.admin === true ?
        <div className='bar'>
            <div className='logo items'>
                <h2 className='m-0' role="button" onClick={() => navigate('/home')}>DocOr 📚</h2>
                <h1 className="pl m-0">|</h1>
                <div className="itemnav">
                    <a className="nav-link decorationItem" href="/home">Home</a>
                </div>
                <div className="itemnav">
                    <a className="nav-link decorationItem" href="/editDocumentation">Documentacion</a>
                </div>
                <div className="itemnav">
                    <a className="nav-link decorationItem" href="/editFiles">Archivos</a>
                </div>
                <div className="itemnav">
                    <a className="nav-link decorationItem" href="/chat">Chat</a>
                </div>
            </div>
            <div className='items'>
                <Dropdown className='m-0 p-0 marpario' onChange={(e) => dropdw(e.value, navigate)} options={options} placeholder='Perfil'/>
            </div>
        </div>
        : rol.empleado === true ?
        <div className='bar'>
            <div className='logo items'>
                <h2 className='m-0' role="button" onClick={() => navigate('/home')}>DocOr 📚</h2>
                <h1 className="pl m-0">|</h1>
                <div className="itemnav">
                    <a className="nav-link decorationItem" href="/home">Home</a>
                </div>
                <div className="itemnav">
                    <a className="nav-link decorationItem" href="/documentation">Documentacion</a>
                </div>
                <div className="itemnav">
                    <a className="nav-link decorationItem" href="/files">Archivos</a>
                </div>
                <div className="itemnav">
                    <a className="nav-link decorationItem" href="/chat">Chat</a>
                </div>
            </div>
            <div className='items'>
                <Dropdown className='m-0 p-0 marpario' onChange={(e) => dropdw(e.value, navigate)} options={options} placeholder='Perfil'/>
            </div>
        </div>
        :
        null
        }
      </div>
    );
}
  
export default Nav;
  