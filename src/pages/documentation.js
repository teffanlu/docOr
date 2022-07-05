import { useState, useEffect } from 'react'; 
import Nav from '../components/navLog';
import axios from 'axios';

const Documentation = () => {

  const [data, setData] = useState([]);
  var admin_id = JSON.parse(localStorage.getItem("userData") || ['{"admin_id":0}'])[0].admin_id;

  useEffect(() => {

    async function getData () {

      try {
        let response = await axios.get('https://docor-api.herokuapp.com/api/info/documentacion/'+admin_id);
        console.log(response.data);

        setData(response.data);
      } catch (err) {
        console.log(err.response.data.message); 
        alert("404");
      } finally {
        //
      }

    }
    getData();
    
    console.log("Hola mundo");
  }, []);

  return (
    <>
      <Nav/>
      <div className='about padin'>

        { data.length >= 1 ?
          data.map((div, i) =>
            <div key={i} className='CardBody mb-4 wordWrap'>

              <h1>{div.titulo}</h1>
              <h3>{div.subtitulo}</h3>
              <h5>{div.texto}</h5>

                { div.linkTipe === "youtube" ?
                    <a target='_blank' rel="noreferrer" href={div.link}>
                      <iframe id="myframe" className='youtu' 
                        src={div.link} 
                        title="YouTube video player" frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      >
                      </iframe>
                    </a>
                  : 
                  div.linkTipe === "img" ?
                    <a target='_blank' rel="noreferrer" href={div.link}>
                      <img className='imgCard' alt={div.link} src={div.link} />
                    </a>
                  : 
                  div.linkTipe === "page" ?
                    <a target='_blank' rel="noreferrer" href={div.link}>
                      <h5>{div.linkName}</h5>
                    </a>
                  :
                  div.linkTipe === "none" ?
                    <h5 className='none'>{div.link}</h5>
                  :
                    null
                }

            </div>
          )
          :
          <h1 className='text-center padinT'>Aun sin informacion!</h1>
        }

      </div>
    </>
  );
};

export default Documentation;
