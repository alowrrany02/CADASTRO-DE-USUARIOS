import { useState } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'

function Home() {
  const users = [
    {
      id:'2343fgd',
      name: 'Rodolfo',
      age: 23,
      email:'shjsc@gmail.com'
    },
    {
      id:'23fd43fgd',
      name: 'Maria',
      age: 33,
      email:'scvsdf@gmail.com'
    },
    {
      id:'2390d43fgd',
      name: 'Joao',
      age: 53,
      email:'jagad@gmail.com'
    }
]

  return (
    <>
      <div className="container">
        <form>
            <h1>Cadastro de Formulário</h1>
            <input placeholder='Nome' name='nome' type='text'/>
            <input placeholder='Idade' name='idade' type='number' />
            <input placeholder='Email' name='email' type='email' />
            <button type='button'>Cadastrar</button>
        </form>
        {users.map((user) => (

        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name} </span></p>
            <p>Idade: <span>{user.idade} </span></p>
            <p>Email: <span>{user.email} </span></p>
          </div>
          <button>
            <img src={Trash} />
          </button>
        </div>
          
        ))}
      </div>
    </>
  )
}

export default Home
