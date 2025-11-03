import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/user-context.jsx'

// Punto de entrada principal de la aplicación React
// Aquí se renderiza el componente <App /> dentro del elemento HTML con id="root"
createRoot(document.getElementById('root')).render(

  // BrowserRouter: habilita la navegación SPA (sin recargar la página)
  <BrowserRouter>
    {/* UserProvider: contexto global que gestiona el estado del usuario autenticado */}
    <UserProvider>
      {/* StrictMode: herramienta de desarrollo que detecta errores y malas prácticas */}
      <StrictMode>
        {/* App: componente raíz de toda la aplicación */}
        <App />
      </StrictMode>
    </UserProvider>
  </BrowserRouter>
)

