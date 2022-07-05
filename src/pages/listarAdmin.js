import React, {useState, useEffect} from 'react';
import Nav from '../components/navLog';
import axios from 'axios';

import RegisterAdmin from '../components/registerAdmin';

function ListarAdmin() {

  const [data, setData] = useState([]);
  const [register, setRegister] = useState(true);
  const [Confirm, setConfirm] = useState(false);
  var empresa_id = JSON.parse(localStorage.getItem("userData") || [{"id_empresa":0}])[0].id_empresa;

  useEffect(() => {
    async function getData(){
      try {
        let res = await axios.get('https://docor-api.herokuapp.com/api/users/admins/'+ empresa_id);
        console.log(res.data);

        if(res.data.length > 0){
          setData(res.data);
          setConfirm(true);
        } else{
          setConfirm(false);
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
        <div className='about padin'>
          <div className='text-center'>
            <button 
              type="button" 
              className="item btn btn-success" 
              onClick={() => {setRegister(!register)}}
            >
              Agregar nuevo Admin ➕
            </button>
          </div>
          { register ?
            <div>
              { !Confirm ? 
                <h1>Aun no hay admins en la empresa.</h1>
                : 
                data.map((div, i) =>
                  <div key={i}>
                    <h2>{i + 1} : {div.nombre}</h2>
                  </div>
                )
              }
            </div>
            :
            <RegisterAdmin/>
          }
        </div>
      </div>
  );
}

export default ListarAdmin;
