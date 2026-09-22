import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const [aberto, setAberto] = useState(false)

  const fechar = () => setAberto(false)

  return (
    <nav className="navbar">
      <div className="navbar-topo">
        <span className="navbar-titulo">Estoque</span>
        <button className="navbar-hamburguer" onClick={() => setAberto(!aberto)}>
          ☰
        </button>
      </div>

      <div className={`navbar-links ${aberto ? 'aberto' : ''}`}>
        <NavLink to="/" onClick={fechar} className={({ isActive }) => isActive ? 'ativo' : ''}>
          Lista
        </NavLink>
        <NavLink to="/adicionar" onClick={fechar} className={({ isActive }) => isActive ? 'ativo' : ''}>
          Adicionar
        </NavLink>
        <NavLink to="/editar" onClick={fechar} className={({ isActive }) => isActive ? 'ativo' : ''}>
          Atualizar
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar