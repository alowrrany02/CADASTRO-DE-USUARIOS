import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])
  const [editingUserId, setEditingUserId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editAge, setEditAge] = useState('')
  const [editEmail, setEditEmail] = useState('')

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    })
    // Limpar inputs após criar
    inputName.current.value = ''
    inputAge.current.value = ''
    inputEmail.current.value = ''
    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }

  async function startEditing(user) {
    setEditingUserId(user.id)
    setEditName(user.name)
    setEditAge(user.age)
    setEditEmail(user.email)
  }

  async function cancelEditing() {
    setEditingUserId(null)
    setEditName('')
    setEditAge('')
    setEditEmail('')
  }

  async function saveEditing(id) {
    await api.put(`/usuarios/${id}`, {
      name: editName,
      age: editAge,
      email: editEmail,
    })
    setEditingUserId(null)
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div className="container">
        <form>
          <h1>Cadastro de Formulário</h1>
          <input placeholder="Nome" name="nome" type="text" ref={inputName} />
          <input placeholder="Idade" name="idade" type="number" ref={inputAge} />
          <input placeholder="Email" name="email" type="email" ref={inputEmail} />
          <button onClick={createUsers} type="button">
            Cadastrar
          </button>
        </form>

        {users.map((user) => (
          <div key={user.id} className="card">
            {editingUserId === user.id ? (
              // Modo edição
              <div>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  type="number"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                />
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
                <div className="butoonnovo">
                  <button onClick={() => saveEditing(user.id)}>Salvar</button>
                  <button onClick={cancelEditing}>Cancelar</button>
                </div>
              </div>
            ) : (
              // Modo visualização
              <div>
                <p>
                  Nome: <span>{user.name} </span>
                </p>
                <p>
                  Idade: <span>{user.age} </span>
                </p>
                <p>
                  Email: <span>{user.email} </span>
                </p>
                <div className="butonn">
                  <button onClick={() => startEditing(user)}>Editar</button>
                  <button onClick={() => deleteUsers(user.id)}>
                    <img src={Trash} alt="Deletar" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
