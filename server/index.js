var socketIO = require('socket.io') // Importação da biblioteca socket.io
var io = socketIO(3000) // Inicia servidor WebSocket

// Vetor de usuários
var usuarios = []

// Evento que recebe conexões vindas do client
io.on('connection', function(socket) {
  // Parâmetro "socket" representa o usuário conectado
  console.log('Usuário conectado!')

  // Evento emitido pelo client para registrar os dados do usuário
  socket.on('criarUsuario', function(dados) {
    usuarios.push(dados) // Adiciona usuário no vetor

    console.log(usuarios)
  })

  // Evento emitido pelo client quando um usuário é desconectado
  socket.on('disconnect', function() {
    // Remove usuário da lista de usuários
    usuarios = usuarios.filter(function(usuarioAtual) {
      return usuarioAtual.id !== socket.id
    })

    console.log(usuarios)
  })
})
