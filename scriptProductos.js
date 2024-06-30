/*Boton Nuevo*/
function Abrir() {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
}
function Cerrar() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
}
function GuardarN(){
    let fecha = document.getElementById("txtFechaN").value.replace(/-/g, '.');
    var Nuevo={
        param1: document.getElementById("txtTituloN").value,
        param2: document.getElementById("txtPrecioPesoN").value,
        param3: document.getElementById("txtPrecioDolarN").value,
        param4: fecha
    }
    fetch('https://api.yumserver.com/17016/generic/Productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Nuevo)
        })
        .then(response => response.text())
        .then(data => {console.log(data)
            alert("Se guardo el producto correctamente")
        })
        .catch(error => console.error('Error: ', error));
    Cerrar();
    document.getElementById("txtTituloN").value="";
    document.getElementById("txtPrecioPesoN").value="";
    document.getElementById("txtPrecioDolarN").value="";
    document.getElementById("txtFechaN").value="";
}
/*Boton Modificar*/
function Abrir2() {
    var id = document.getElementById("txtIdModificar").value;
    if (id !== "") {
        fetch('https://api.yumserver.com/17016/generic/Productos')
            .then(response => response.json())
            .then(data => {
                for(let i=0;i<data.length;i++){
                    let fecha = data[i].param4.replace(/\./g, '-');
                    if (data[i].idcod === id) {
                        document.getElementById("txtTituloM").value=data[i].param1;
                        document.getElementById("txtPrecioPesoM").value=data[i].param2;
                        document.getElementById("txtPrecioDolarM").value=data[i].param3;
                        document.getElementById("txtFechaM").value=fecha;
                        let modal = document.getElementById("myModal2");
                        modal.style.display = "block";
                        return;
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("La Id no existe");
            });
    } else {alert("Ingrese una id");}
}    
function Cerrar2() {
    let modal = document.getElementById("myModal2");
    modal.style.display = "none";
}
/*Boton Guardar de Modificar*/
function GuardarM(){
    let fecha = document.getElementById("txtFechaM").value.replace(/-/g, '.');
    var Modificar={
        idcod: document.getElementById("txtIdModificar").value,
        param1: document.getElementById("txtTituloM").value,
        param2: document.getElementById("txtPrecioPesoM").value,
        param3: document.getElementById("txtPrecioDolarM").value,
        param4: fecha
    }
    fetch('https://api.yumserver.com/17016/generic/Productos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Modificar)
    })
    .then(response => response.text())
    .then(data => {console.log(data);
        if(data === "OK"){
            alert("Se guardo el producto correctamente")}
            else{alert("No se guardo el producto")}
    })
    .catch(error => console.error('Error:', error));
    document.getElementById("txtIdModificar").value = "";
    Cerrar2();
}
/*Boton Eliminar*/
function Confirmacion() {
    var resultado = confirm("¿Estas seguro de eliminar este producto?");
    if (resultado) {
        fetch('https://api.yumserver.com/17016/generic/Productos')
		.then(response => response.json())
		.then(Eliminar);
    }
}
function Eliminar(data){
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
                fetch('https://api.yumserver.com/17016/generic/Productos',{
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({idcod:data[i].idcod})
                })
                .then(response => response.text())
                .then(data => console.log(data))
            }}
}
/*Tabla de Productos*/
window.addEventListener('load', Api);
function Api(){
    fetch('https://api.yumserver.com/17016/generic/Productos')
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

