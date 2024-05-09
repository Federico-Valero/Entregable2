const socket= io()

socket.emit('recibirMensajeCliente','Estoy usando el socket y soy el cliente')
socket.on('soloParaElActual', dataServer =>{
    console.log(dataServer)
})