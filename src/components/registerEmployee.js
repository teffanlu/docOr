import React, {useState} from 'react';
import axios from 'axios';

function Register() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [Confirm, setConfirm] = useState(false);
  const [nameExist, setNameExist] = useState(false);
  var admin_id = JSON.parse(localStorage.getItem("userData") || [{"id_admin":0}])[0].id_admin;
  var empresa_id = JSON.parse(localStorage.getItem("userData") || [{"empresa_id":0}])[0].empresa_id;
  
  const doLogin = async (e) => {
    e.preventDefault();
    console.log(name, email);
    if(name !== "" & email !== "" & cargo !== ""){
      console.log("si entro!");
      try {
        let res = await axios.post('http://localhost:4000/api/users/comprobName', {
        nombre : name
        });
        console.log(res.data);

        //Se comprueba si el nombre existe recibiendo tres listas una de empleado otra de admin y otra de empresa
        console.log(res.data[0], res.data[1], res.data[2]);
        if(res.data[0].length === 0 & res.data[1].length === 0 & res.data[2].length === 0){

          var clave = Math.trunc(Math.random() * (999999 - 100000) + 100000);

          let response = await axios.post('http://localhost:4000/api/users/empleado', {
          nombre : name,
          email,
          clave,
          cargo,
          empresa_id,
          admin_id
          });
          console.log(response);
          alert('Registro exitoso!');
          window.location.reload();

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
          { Confirm ?
            <p className='text-danger'>Hay campos vacios</p>
            :
            null
          }
          <input type="text" placeholder="Nombre del empleado" onChange={(e)=> setName(e.target.value)} required/>
          <input type="email" placeholder="Email del empleado" onChange={(e)=> setEmail(e.target.value)} required/>
          <input type="text" placeholder="Cargo o rol del Empleado" onChange={(e)=> setCargo(e.target.value)}/>
          <button onClick={(e)=> doLogin(e)}>Registrar Empleado</button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
