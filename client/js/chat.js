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

const socket = io('ws://localhost:3000')

socket.on('connect', () => {
  const data = getURLParameters()
  socket.emit('createUser', data)
})

socket.on('listUsers', users => {
  renderListUser(users)
})
