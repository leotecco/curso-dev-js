// Captura parâmetros da URL
const getURLParameters = () => {
  const urlString = window.location.href
  const url = new URL(urlString)
  const user = url.searchParams.get('user')
  const status = url.searchParams.get('status')

  return {
    user,
    status,
  }
}

// Cria lista de usuários
const renderListUser = users => {
  const list = document.querySelector('#list-user')
  list.innerHTML = ''

  users.forEach(user => {
    const item = document.createElement('li')
    item.classList.add('sidebar__user')
    item.classList.add('mb-small')

    const name = document.createElement('p')
    name.classList.add('sidebar__user-name')
    name.textContent = user.user

    const status = document.createElement('p')
    status.classList.add('sidebar__user-status')
    status.textContent = user.status

    item.appendChild(name)
    item.appendChild(status)
    list.appendChild(item)
  })
}

// Cria lista de mensagens
const renderListMessages = messages => {
  const list = document.querySelector('#list-messages')
  list.innerHTML = ''

  messages.forEach(message => {
    const item = document.createElement('div')
    item.classList.add('message')

    const box = document.createElement('div')
    box.classList.add('message__box')

    const text = document.createElement('p')
    text.classList.add('message__text')
    text.textContent = message.message

    if (message.idUser === socket.id) {
      item.classList.add('message--sent')
    } else {
      const user = document.createElement('p')
      user.classList.add('message__user')
      user.textContent = message.user

      item.classList.add('message--received')
      box.appendChild(user)
    }

    item.appendChild(box)
    box.appendChild(text)
    list.appendChild(item)
    list.scrollTop = list.scrollHeight
  })
}

// Adicionar listener para o input de formulário
const listenerFormMessage = () => {
  const form = document.querySelector('#form-message')
  const input = document.querySelector('#input-message')

  form.addEventListener('submit', event => {
    event.preventDefault()

    if (input.value !== '') {
      socket.emit('createMessage', {
        text: input.value,
        user: getURLParameters().user,
      })
      input.value = ''
    }
  })
}

// Cria conexão
const socket = io('ws://localhost:3000')

// Recebe evento de conexão
socket.on('connect', () => {
  listenerFormMessage()

  const data = getURLParameters()
  socket.emit('createUser', data)
})

// Recebe evento de listagem de usuários
socket.on('listUsers', users => {
  renderListUser(users)
})

socket.on('newMessages', messages => {
  renderListMessages(messages)
})
