import { useState } from 'react'
import './style.css'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
        <form>
            <h1>Cadastro de Formulário</h1>
            <input name='nome' type='text'/>
            <input name='idade' type='number' />
            <input name='email' type='email' />
            <button type='button'>Cadastrar</button>
        </form>
      </div>
    </>
  )
}

export default Home
