import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [ConfirmClave, setConfirmClave] = useState('');
  const [Confirm, setConfirm] = useState(false);
  const [nameExist, setNameExist] = useState(false);

  const doLogin = async (e) => {
    e.preventDefault();
    console.log(name, email, clave, ConfirmClave);
    if(clave === ConfirmClave & name !== "" & email !== "" & clave !== ""){
      console.log("si entro!");
      try {
        let res = await axios.post('https://docor-api.herokuapp.com/api/users/comprobName', {
        nombre : name
        });
        console.log(res.data);

        //Se comprueba si el nombre existe recibiendo tres listas una de empleado otra de admin y otra de empresa
        console.log(res.data[0], res.data[1], res.data[2]);
        if(res.data[0].length === 0 & res.data[1].length === 0 & res.data[2].length === 0){

          let response = await axios.post('https://docor-api.herokuapp.com/api/users/empresa', {
          nombre : name,
          email,
          password : clave
          });
          console.log(response);
          localStorage.setItem("rol", JSON.stringify({"empresa":true}));
          localStorage.setItem("userData", JSON.stringify(response.data));
          alert('Registro exitoso!');
          navigate('/editHome');

        }else{
          setNameExist(true);
        }

      } catch (err) {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      } finally {
        //
      }
    }else{
      setConfirm(true);
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <div className="login-form" >
        <form>
          { nameExist ?
            <p className='text-danger'>El nombre Ya existe</p>
            :
            null
          }
          <input type="text" placeholder="Nombre de la empresa" onChange={(e)=> setName(e.target.value)} required/>
          <input type="email" placeholder="Email de la empresa" onChange={(e)=> setEmail(e.target.value)} required/>
          <input type="password" placeholder="Contraseña" onChange={(e)=> setClave(e.target.value)} required/>
          { Confirm ?
            <p className='text-danger'>Hay campos vacios o las contraseñas no son iguales</p>
            :
            null
          }
          <input type="password" placeholder="Confirmar Contraseña" onChange={(e)=> setConfirmClave(e.target.value)}/>
          <button onClick={(e)=> doLogin(e)}>Registrar Empresa</button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
