import styles from './login.module.css'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/user-context'

// Página de login que usa el contexto de usuario y redirige tras autenticación
const LoginPage = () => {

    const navigate = useNavigate()
  const { loginUser, user, error } = useUserContext()
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Extrae los campos del formulario como objeto plano { email, password }
    const fields = Object.fromEntries(new FormData(e.target))
    // Llama a la función de login del contexto y, si no falla, navega al perfil
    await loginUser(fields)
    navigate("/profile")
  }

  return (
    <>
    {/* Formulario controlado por handleSubmit para iniciar sesión */}
    <section className={styles.section}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2>¿Cuál es tu email y tu contraseña?</h2>

        <div className={styles.formfield}>
          <label className={styles.h2} htmlFor="email">Correo:</label>
          <input className={styles.input}  type="text" id="email" name="email" required />
        </div>

        <div className={styles.formfield}>
          <label className={styles.h2} htmlFor="password">Contraseña:</label>
          <input className={styles.input} type="password" name="password" required />
        </div>

        {/* Botón de envío; el posible error se podría mostrar debajo */}
        <button className={styles.btn} type="submit">Iniciar Sesión</button>
       { /*error && (<p>*usuario o contraseña incorrecto</p>)*/}
      </form>
      </section>
    </>
  )
}

export default LoginPage
