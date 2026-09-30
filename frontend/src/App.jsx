import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Adicionar from './pages/Adicionar'
import Editar from './pages/Editar'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="pagina">
        <Header />
        <main className="conteudo">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adicionar" element={<Adicionar />} />
            <Route path="/editar" element={<Editar />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App