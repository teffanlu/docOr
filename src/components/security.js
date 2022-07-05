var rol = {"empresa":false, "admin":false, "empleado":false};
var val = JSON.parse(localStorage.getItem("rol") || '{"none":false}');

function Sec(navigate) { 
    if(val.none === undefined){
        if(val.empresa) rol.empresa = true;
        if(val.admin) rol.admin = true;
        if(val.empleado) rol.empleado = true;
        if(val.empresa === false || val.admin === false || val.empleado === false){
            navigate('/');
        }
    }else{ navigate('/')}
}

export default Sec;