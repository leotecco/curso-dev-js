// Função responsável por capturar o usuário da URL
function retornaUsuario(id) {
  var urlString = window.location.href
  var url = new URL(urlString)
  var usuario = url.searchParams.get('user')
  var status = url.searchParams.get('status')

  return {
    id,
    usuario,
    status,
  }
}

var socket = io('ws://localhost:3000') // Cria conexão com o server

// Evento recebido pelo client quando é estabelecida a conexão com o server
socket.on('connect', function() {
  alert('Conectado')

  // Emite evento para o server para registrar o usuário
  socket.emit('criarUsuario', retornaUsuario(socket.id))
})
