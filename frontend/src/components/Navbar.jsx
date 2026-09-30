import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  const [aberto, setAberto] = useState(false)
  const fechar = () => setAberto(false)

  return (
    <header className="header">
      <NavLink to="/" className="logo" onClick={fechar}>
        <span className="logo-icone">🧾</span>
        <span className="logo-texto">Estoque</span>
      </NavLink>

      <button className="navbar-hamburguer" onClick={() => setAberto(!aberto)}>
        ☰
      </button>

      <nav className={`navbar-links ${aberto ? 'aberto' : ''}`}>
        <NavLink to="/" onClick={fechar} className={({ isActive }) => isActive ? 'ativo' : ''}>
          Lista
        </NavLink>
        <NavLink to="/adicionar" onClick={fechar} className={({ isActive }) => isActive ? 'ativo' : ''}>
          Adicionar
        </NavLink>
        <NavLink to="/editar" onClick={fechar} className={({ isActive }) => isActive ? 'ativo' : ''}>
          Atualizar
        </NavLink>
      </nav>
    </header>
  )
}

export default Header