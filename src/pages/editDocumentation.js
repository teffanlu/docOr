import { useState, useEffect } from 'react'; 
import Nav from '../components/navLog';
import axios from 'axios';

const EditDocumentation = () => {
  const [title1, setTitle1] = useState('titulo');
  const [title3, setTitle3] = useState('subtitulo');
  const [title5, setTitle5] = useState('texto');
  const [link, setLink] = useState('link');

  const [stateH1, setStateH1] = useState(true);
  const [stateH3, setStateH3] = useState(true);
  const [stateH5, setStateH5] = useState(true);
  const [addLink, setAddLink] = useState(true);

  const [cambio, setCambio] = useState([]);
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);

  const [get, setGet] = useState(false);

  var admin_id = JSON.parse(localStorage.getItem("userData") || [{"id_admin":0}])[0].id_admin;

  useEffect(() => {

    async function getData () {

      try {
        let response = await axios.get('https://docor-api.herokuapp.com/api/info/documentacion/'+admin_id);
        console.log(response.data);

        setData(response.data);
        setCambio(response.data);
      } catch (err) {
        console.log(err.response.data.message);
        alert("404");
      } finally {
        //
      }

    }
    getData();
  }, [get]);

  async function eliminar (i, id_doc) {

      try {
        await axios.delete('https://docor-api.herokuapp.com/api/info/documentacion/'+id_doc);

        data.splice(i, 1);
        await setData([...data]);

        setCambio(data);
        setNewData([]);
  
      } catch (err) {
        console.log(err.response.data.message);
        alert("404");
      } finally {
        //
      }
  }

  async function NewDiv (tipo) {

    if(tipo === "titulo"){
      if(title1 !== ""){
        console.log(tipo + ": "+ title1);
        await setData([...data, {"titulo":title1}]);
        await setNewData([...newData, {"titulo":title1}]);
      }
    }
    if(tipo === "subtitulo"){
      if(title3 !== ""){
        console.log(tipo + ": "+ title3);
        await setData([...data, {"subtitulo": title3}]);
        await setNewData([...newData, {"subtitulo": title3}]);
      }
    }
    if(tipo === "texto"){
      if(title5 !== ""){
        console.log(tipo + ": "+ title5);
        await setData([...data, {"texto": title5}]);
        await setNewData([...newData, {"texto": title5}]);
      }
    }
    if(tipo === "link"){
      if(link !== ""){

        comprobarLink(link);

        console.log(tipo + ": "+ link);
      }
    }
    
    console.log(data === cambio);
    console.log(data, cambio);
  }

  function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    var match = url.match(regExp);
  
    if (match && match[2].length === 11) {
      return "//www.youtube.com/embed/" + match[2];
    } else {
      return null/*url*/;
    }
  }

  async function comprobarLink (link) {

    let exten = link.split(".");
    let vala = exten[exten.length - 1];

    let val = vala[0]+vala[1]+vala[2];

    console.log(val);

    if(val === "png" || val === "jpe" || val === "jpg" || val === "gif" || val === "bmp" || val === "raw" || val === "svg"){
      setData([...data, {"link": link, "linkTipe": "img"}]);
      setNewData([...newData, {"link": link, "linkTipe": "img"}]);
      return "img";
    }
    
    var embed = await getId(link);
    if( embed != null ){
      setData([...data, {"link": embed, "linkTipe": "youtube"}]);
      setNewData([...newData, {"link": embed, "linkTipe": "youtube"}]);
      return "youtube";
    }

    await axios.get(link)
    .then(function(res) {
      console.log("si existe: ", res.status);
      var html = parserRes(res.data);
      var title = findTitle(html)
      setData([...data, {"link": link, "linkTipe": "page", "linkName": title}]);
      setNewData([...newData, {"link": link, "linkTipe": "page", "linkName": title}]);
      return "page";
    })
    .catch(function(err) {
      setData([...data, {"link": link, "linkTipe": "none"}]);
      setNewData([...newData, {"link": link, "linkTipe": "none"}]);
      return "link";
    });

  }

  const parser = new DOMParser();
  function parserRes (text) {
    return parser.parseFromString(text, 'text/html');
  }

  const findTitle = (nodes) => {
    return nodes.querySelector('title').innerText;
  }

  async function SaveCambio() {
    
    try {
      let response = await axios.post('https://docor-api.herokuapp.com/api/info/documentacion/'+admin_id, {
        newData
      });

      console.log(response);
      setCambio(data);
      setNewData([]);
      setGet(!get);

    } catch (err) {
      console.log(err.response.data.message);
      alert("404");
    } finally {
      //
    }
  }


  //ya eto eh mucho
  /*function arraymove(arr, fromIndex, toIndex) { 
    var element = arr[fromIndex] 
    arr.splice(fromIndex, 1); 
    arr.splice(toIndex, 0, element); 
  }*/

  return (
    <>
      <Nav/>
      <div className='about padin'>

        { data.length >= 1 ?
          data.map((div, i) =>
            <div key={i} className='CardBody mb-4 wordWrap'>
              <button type="button" onClick={() => eliminar(i, div.id_doc)} className="btn btn-secondary btn-rounded float-end">❌</button>
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
          null
        }

        <div className='prueba CardBody mb-4'>
          {
            stateH1 ?
              <div className="m-0 p-0">
                <h1 className='p-0 m-0 d-inline'>Titulo</h1>
                <button type="button" onClick={() => {setStateH1(!stateH1); setTitle1('');}} className="btn btn-secondary p-0 m-0 mb-3">➕</button>
              </div>
            :
              <div className="m-0 p-0">
                Titulo: 
                <input onChange={(e) => setTitle1(e.target.value)} value={title1}></input>
                <button type="button" onClick={() => {setStateH1(!stateH1); NewDiv("titulo");}} className="btn btn-secondary p-0 m-0 mb-1">✔️</button>
                <button type="button" onClick={() => {setTitle1('titulo'); setStateH1(!stateH1);}} className="btn btn-secondary p-0 m-0 mb-1">❌</button>
              </div>
          }
          {
            stateH3 ?
              <div>
                <h3 className='p-0 m-0 d-inline'>Subtitulo</h3>
                <button type="button" onClick={() => {setStateH3(!stateH3); setTitle3('');}} className="btn btn-secondary p-0 m-0 mb-2">➕</button>
              </div>
            :
              <div>
                Subtitulo: 
                <input onChange={(e) => setTitle3(e.target.value)} value={title3}></input>
                <button type="button" onClick={() => {setStateH3(!stateH3); NewDiv("subtitulo");}} className="btn btn-secondary p-0 m-0 mb-1">✔️</button>
                <button type="button" onClick={() => {setTitle3('subtitulo'); setStateH3(!stateH3);}} className="btn btn-secondary p-0 m-0 mb-1">❌</button>
              </div>
          }
          {
            stateH5 ?
              <div>
                <h5 className='p-0 m-0 d-inline'>Texto</h5>
                <button type="button" onClick={() => {setStateH5(!stateH5); setTitle5('');}} className="btn btn-secondary p-0 m-0 mb-1">➕</button>
              </div>
            :
              <div>
                Texto: 
                <input onChange={(e) => setTitle5(e.target.value)} value={title5}></input>
                <button type="button" onClick={() => {setStateH5(!stateH5); NewDiv("texto");}} className="btn btn-secondary p-0 m-0 mb-1">✔️</button>
                <button type="button" onClick={() => {setTitle5('texto'); setStateH5(!stateH5);}} className="btn btn-secondary p-0 m-0 mb-1">❌</button>
              </div>
          }

          {
            addLink ?
              <div>
                <h5 className='p-0 m-0 d-inline'>Link</h5>
                <button type="button" onClick={() => {setAddLink(!addLink); setLink('');}} className="btn btn-secondary p-0 m-0 mb-1">➕</button>
              </div>
            :
              <div>
                Link: 
                <input onChange={(e) =>  setLink(e.target.value)} value={link}></input>
                <button type="button" onClick={() => {setAddLink(!addLink); NewDiv("link");}} className="btn btn-secondary p-0 m-0 mb-1">✔️</button>
                <button type="button" onClick={() => {setLink('link'); setAddLink(!addLink);}} className="btn btn-secondary p-0 m-0 mb-1">❌</button>
              </div>
          }
                    
        </div>

        { cambio !== data ?
          <button type="button" onClick={() => {console.log(data, cambio); SaveCambio();}} className="btn btn-primary p-0 m-0 mb-1">
            <h3 className="m-0 text-info">Guardar cambios 💾</h3>
          </button>
          :
          null
        }
      </div>
    </>
  );
};

export default EditDocumentation;
