// Importação do socket.io
const socketIO = require('socket.io')

// Inicia servidor socket.io
const io = socketIO(3000)

// Vetor de usuários
let users = []

// Captura usuário conectados
io.on('connection', function(socket) {
  // Salva usuário na mémoria
  socket.on('createUser', data => {
    users.push({
      id: socket.id,
      user: data.user,
      status: data.status,
    })

    // Emite usuários conectados
    io.emit('listUsers', users)
  })

  // Remove usuário quando desconecta
  socket.on('disconnect', () => {
    users = users.filter(user => user.id !== socket.id)
  })
})
