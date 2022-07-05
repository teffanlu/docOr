import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login() {

  const navigate = useNavigate();

  const [nick, setNick] = useState('');
  const [clave, setClave] = useState('');
  const [Confirm, setConfirm] = useState(false);
  const [nameExist, setNameExist] = useState(false);
  const [claveExist, setClaveExist] = useState(false);

  const doLogin = async () => {
    setClaveExist(false);
    if(nick !== "" & clave !== ""){
      setConfirm(false);
      console.log("si entro!");
      try {
        let res = await axios.post('http://localhost:4000/api/users/comprobName', {
        nombre : nick
        });

        //Se comprueba si el nombre existe recibiendo tres listas una de empleado otra de admin y otra de empresa
        if(res.data[0].length > 0 ){

          if(res.data[0][0].clave === clave){
            localStorage.setItem("rol", JSON.stringify({"empleado":true}));
            localStorage.setItem("userData", JSON.stringify(res.data[0]));
            alert('Login exitoso!');
            navigate('/home');
          }else{
            setClaveExist(true);
          }

        }else if (res.data[1].length > 0){

          if(res.data[1][0].clave === clave){
            localStorage.setItem("rol", JSON.stringify({"admin":true}));
            localStorage.setItem("userData", JSON.stringify(res.data[1]));
            alert('Login exitoso!');
            navigate('/home');
          }else{
            setClaveExist(true);
          }

        }else if (res.data[2].length > 0){

          if(res.data[2][0].password === clave){
            localStorage.setItem("rol", JSON.stringify({"empresa":true}));
            localStorage.setItem("userData", JSON.stringify(res.data[2]));
            alert('Login exitoso!');
            navigate('/editHome');
          }else{
            setClaveExist(true);
          }

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
      setNameExist(false);
    }
  };

  return (<div>
    <div className="login-page">
      <div className="form">
        <div className="login-form" >
          { nameExist ?
            <p className='text-danger'>Usuario no encontrado, Verifique que lo escribio bien</p>
            :
            null
          }
          { Confirm ?
            <p className='text-danger'>Hay campos vacios!</p>
            :
            null
          }
          <input type="text" placeholder="Usuario" onChange={(e)=> setNick(e.target.value)}/>
          { claveExist ?
            <p className='text-danger'>Clave incorrecta, Verifique los datos e intente de nuevo</p>
            :
            null
          }
          <input type="password" placeholder="Clave" onChange={(e)=> setClave(e.target.value)}/>
          <button onClick={()=> doLogin()}>Inicar</button>
        </div>
      </div>
    </div></div>
  );
}

export default Login;
