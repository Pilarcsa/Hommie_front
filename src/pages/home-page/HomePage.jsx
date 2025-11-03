import styles from './home.module.css'
import SearchComponents from '../../components/search-components/SearchComponents'

// Página de inicio que muestra hero, buscador y secciones informativas
const HomePage = () => {
    return (
        <>

            {/* Hero principal con mensaje de valor */}
            <div className={styles.imagehome}>
                <h1 className={styles.h1}>¡Conoce a tu próximo compañero de piso!</h1>
                <p>Haz <em>match</em> con personas afines para convivir. Porque compartir casa es mucho más que compartir gastos.
                </p>
            </div>

            {/* Barra de búsqueda reutilizable */}
            <div className={styles.divsearch}>
                <SearchComponents /></div>

            {/* CÓMO FUNCIONA --> ARREGLARLO!! */}

            {/* Sección explicativa de pasos del producto */}
            <section className={styles.section}>
                <h2>Así funciona Hoomie</h2>
                <div className={styles.grid3}>
                    <div className={`${styles.card} ${styles.how}`}>
                        <div className={styles.icon} > 
                            <div className={styles.icon}>🔍</div>
                            <h3>Busca en tu zona</h3>
                        </div>
                        <p className={styles.muted}>Indica dónde y cuándo quieres mudarte.</p>

                    </div>
                    <div className={`${styles.card} ${styles.how}`}>
                        <div className={styles.icon}>❤️</div>
                        <div>
                            <h3>Haz match compatible</h3>
                            <p className={styles.muted}>Comparamos hábitos, aficiones y horarios.</p>
                        </div>
                    </div>
                    <div className={`${styles.card} ${styles.how}`}>
                        <div className={styles.icon}>🏡</div>
                        <div>
                            <h3>Conecta y comparte piso</h3>
                            <p className={styles.muted}>Habla con tus matches y encuentra la convivencia perfecta.</p>
                        </div>
                    </div>
                </div>
                <p><a className={styles.btn} href="#por-que">Descubre más</a></p>
            </section>

            {/* POR QUÉ: beneficios clave del servicio */}
            <section className={styles.section}>
                <h2>Vivir acompañado, pero con quien encaja contigo</h2>
                <div className={styles.grid3}>
                    <div className={`${styles.card} ${styles.why}`}>
                        <h3>Compatibilidad real</h3>
                        <p className={styles.muted}>Comparativa de rutinas, limpieza, mascotas, teletrabajo y más.</p>
                    </div>
                    <div className={`${styles.card} ${styles.why}`}>
                        <h3>Verificación y chat</h3>
                        <p className={styles.muted}>Perfiles verificados y mensajes privados para conoceros.</p>
                    </div>
                    <div className={`${styles.card} ${styles.why}`}>
                        <h3>Ahorro inteligente</h3>
                        <p className={styles.muted}>Encuentra habitaciones o juntad fuerzas para alquilar juntos.</p>
                    </div>
                </div>
            </section>

  {/* TESTIMONIOS */}

             <section  className={styles.section}>

      <h2>Historias reales</h2>
      <div className={styles.grid3}>
        <div className={`${styles.card} ${styles.who}`}>
          <p>“Conocí a mi actual compi en RoomMatch. Llevamos un año y seguimos siendo amigos.”</p>
          <span>Lucía · 27 años · Madrid</span>
        </div>
        <div className={`${styles.card} ${styles.who}`}>
          <p>“Antes era un lío buscar piso y gente afín. Ahora, todo en una app.”</p>
          <span>Álvaro · 30 años · Valencia</span>
        </div>
        <div className={`${styles.card} ${styles.who}`}>
          <p>“El cuestionario de compatibilidad nos ahorró sorpresas. ¡Repetiría!”</p>
          <span >Sara · 25 años · Barcelona</span>
        </div>
      </div>
    
  </section>

     {/* FAQ (placeholder simple) */}

  <section  className={styles.section}>
   
      <h2>Preguntas frecuentes</h2>
      <div className={styles.grid3}>
        <div  className={styles.card}>
          <h3>¿Es gratis?</h3>
          <p className={styles.muted}>Puedes buscar y chatear gratis. Añade verificación y opciones <em>premium</em> si quieres más
            visibilidad.</p>
          </div>
        <div  className={styles.card}>
          <h3>¿Cómo funciona el match?</h3>
          <p className={styles.muted}>Cruzamos tus respuestas de estilo de vida con las de otros usuarios en tu zona.</p>
        </div>
        <div  className={styles.card}>
          <h3>¿Es seguro?</h3>
          <p className={styles.muted}>Perfiles verificados, reportes y consejos de convivencia para una experiencia segura.</p>
        </div>
    
    </div>
  </section>

        </>

    )
}

export default HomePage 
