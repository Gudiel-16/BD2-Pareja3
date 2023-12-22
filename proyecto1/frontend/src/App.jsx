import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioSesion from './pages/InicioSesion';
import Publicaciones from './pages/Publicaciones';
import Perfil from './pages/Perfil';
import Sidebar from './components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (
    <>
       <Router>
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
              <Routes>
                <Route path="/" element={<InicioSesion />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/publicaciones" element={<Publicaciones />} />
              </Routes>
            </main>
          </div>
        </div>
       </Router>
    </>
  )
}

export default App
