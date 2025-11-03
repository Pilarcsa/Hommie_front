import styles from './feed.module.css'
import { useEffect, useState } from 'react'
import FeedCardComponents from '../../components/feed-card-components/FeedCardComponents.jsx'
import SearchComponents from '../../components/search-components/SearchComponents.jsx'
import { getAllPost } from '../../service/api/post-api-service.js'
import { useUserContext } from '../../context/user-context.jsx'
import { useNavigate } from 'react-router-dom'

// Página principal del feed que muestra todos los posts disponibles
const FeedPage = () => {
    const { user } = useUserContext()
    const [posts, setPosts] = useState([]) // guarda los posts obtenidos
    const navigate = useNavigate()
     console.log("info del user", user)
    console.log("info del post", setPosts)

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getAllPost()
                setPosts(res.data) // almacena la respuesta en el estado
            } catch (error) {
                console.log(error)
            }
        }
        if (!user) {
            navigate("/login") // redirige si no hay usuario autenticado
        }
        fetchData()
    }, [])

    return (
        <>
            {/* Sección principal de bienvenida */}
            <div className={styles.imagehome}>
                <h1 className={styles.h1}>¡Conoce a tu próximo compañero de piso!</h1>
                <p>Haz <em>match</em> con personas afines para convivir. Porque compartir casa es mucho más que compartir gastos.
                </p>
            </div>

            {/* Barra de búsqueda */}
            <div className={styles.divsearch}>
                <SearchComponents />
            </div>

            {/* Contenido del feed */}
            <section className={styles.content}>
                <aside className={styles.side}>
                    <div className={styles.filtercard}>
                        <h3>Filtros rápidos</h3>
                        <div className={styles.filtergroup}>
                            <label className={styles.check}><input type="checkbox" /> No fumadores</label>
                            <label className={styles.check}><input type="checkbox" /> Con mascotas</label>
                            <label className={styles.check}><input type="checkbox" /> Teletrabajo</label>
                            <label className={styles.check}><input type="checkbox" /> Con baño propio</label>
                        </div>
                    </div>
                </aside>

                <section className={styles.feed}>
                    {/* Ciudades destacadas */}
                    <div className={styles.chips}>
                        <span className={styles.chip}>Madrid</span>
                        <span className={styles.chip}>Barcelona</span>
                        <span className={styles.chip}>Valencia</span>
                        <span className={styles.chip}>Sevilla</span>
                        <span className={styles.chip}>Bilbao</span>
                        <span className={styles.chip}>Málaga</span>
                    </div>

                    {/* Muestra los posts obtenidos del backend */}
                    <div className={styles.feedcard}>
                        {posts.length > 0
                            ? posts.map(post => (
                                <div key={post._id}>
                                    <FeedCardComponents post={post} user={user} />
                                </div>
                              ))
                            : (<p>no hay contenido para mostrar</p>)
                        }
                    </div>
                </section>
            </section>
        </>
    )
}

export default FeedPage
