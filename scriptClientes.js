function AbrirClientes() {
    let modal = document.getElementById("myModal3");
    modal.style.display = "block";
}
function CerrarClientes() {
    let modal = document.getElementById("myModal3");
    modal.style.display = "none";
}
var Id=0;
var urlCliente='https://api.yumserver.com/17016/generic/Clientes';
function GuardarNClientes(){
    let fecha = document.getElementById("txtFechaN").value.replace(/-/g, '.');
    var Nuevo={
        param1: document.getElementById("txtApellidoN").value,
        param2: document.getElementById("txtNombreN").value,
        param3: document.getElementById("txtPedidoN").value,
        param4: fecha
    }
    fetch(urlCliente, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Nuevo)
        })
        .then(response => response.text())
        .then(data => {console.log(data)
            alert("Se guardo el producto correctamente")
        })
        .catch(error => console.error('Error: ', error));
    CerrarClientes();
    document.getElementById("txtApellidoN").value="";
    document.getElementById("txtNombreN").value="";
    document.getElementById("txtPedidoN").value="";
    document.getElementById("txtFechaN").value="";
}
/*Boton Modificar*/
function Abrir2Clientes() {
    var id = document.getElementById("txtIdModificar2").value;
    if (id !== "") {
        fetch(urlCliente)
            .then(response => response.json())
            .then(data => {
                for(let i=0;i<data.length;i++){
                    let fecha = data[i].param4.replace(/\./g, '-');
                    if (data[i].idcod === id) {
                        document.getElementById("txtApellidoM").value = data[i].param1;
                        document.getElementById("txtNombreM").value  =data[i].param2;
                        document.getElementById("txtPedidoM").value = data[i].param3;
                        document.getElementById("txtFechaM").value = fecha;
                        let modal = document.getElementById("myModal4");
                        modal.style.display = "block";
                        break;
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("La Id no existe");
            });
    } else {alert("Ingrese una id");}
}    
function Cerrar2Clientes() {
    let modal = document.getElementById("myModal4");
    modal.style.display = "none";
}
/*Boton Guardar de Modificar*/
function GuardarMClientes(){
    let fecha = document.getElementById("txtFechaM").value.replace(/-/g, '.');
    var Modificar = {
        idcod: document.getElementById("txtIdModificar2").value,
        param1: document.getElementById("txtApellidoM").value,
        param2: document.getElementById("txtNombreM").value,
        param3: document.getElementById("txtPedidoM").value,
        param4: fecha
    }
    document.getElementById("txtIdModificar2").value = "";
    fetch(urlCliente, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Modificar)
    })
    .then(response => response.text())
    .then(data => {console.log(data);
        if(data === "OK"){
        alert("Se guardo el producto correctamente")}
        else{alert("No se guardo el clientes")}
    })
    .catch(error => console.error('Error:', error));
    Cerrar2Clientes();
}
/*Boton Eliminar*/

function ConfirmacionClientes() {
    var resultado = confirm("¿Estas seguro de eliminar este producto?");
    if (resultado) {
        fetch(urlCliente)
		.then(response => response.json())
		.then(EliminarClientes);
    }
}
function EliminarClientes(data){
    let correcto=[];
    const checkboxes = document.querySelectorAll('.checkbox');
    let nro=0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            correcto[nro]=true;
        }
        else{correcto[nro]=false;}
        nro++;
    });
    for(let i=0;i<data.length;i++){
            if(correcto[i]===true){
                fetch(urlCliente,{
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({idcod:data[i].idcod})
                })
                .then(response => response.text())
                .then(data => console.log(data))
            }}
}
/*Tabla de Productos*/
window.addEventListener('load', ApiClientes);
function ApiClientes(){
    fetch(urlCliente)
		.then(response => response.json())
		.then(MostrarTabla);
}
function MostrarTabla(data) {
    let html=``;
	for (let i = 0; i < data.length; i++) {
        let fecha = data[i].param4.replace(/\./g,'-');
		html += `
                <tr>
                    <td> <input type="checkbox" class="checkbox"></td>
                    <td>${data[i].idcod}</td>
                    <td>${data[i].param1}</td>
                    <td>$${data[i].param2}</td>
                    <td>$${data[i].param3}</td>
                    <td>${fecha}</td>
                </tr>
			`;
	}
    document.getElementById("resultado").innerHTML = html;
}