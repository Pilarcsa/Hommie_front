import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/user-context.jsx';
import { postById, deletePostById, updatePostById } from '../../service/api/post-api-service.js';
import PostForm from '../../components/post-form-components/PostForm.jsx';
import MyPost from '../../components/user-components/MyPost.jsx';
import styles from './user.module.css';

// Página de perfil: protege la ruta y carga los posts del usuario autenticado
const UserPage = () => {
  const navigate = useNavigate()
  const { user, loading } = useUserContext()
  const [posts, setPosts] = useState([])
  console.log("info del user", user)
  console.log("info del post", setPosts)
  
  // Al montar: si no hay usuario, redirige; si hay, pide sus posts al backend
    if (!loading && !user) return <Navigate to="/login" replace />

  useEffect(() => {

    async function fetchData() {
            try {
                const res = await MyPost()
                setPosts(res.data) // almacena la respuesta en el estado
            } catch (error) {
                console.log(error)
            }
        }
    
    (async () => {
      try {
        const res = await postById()
        setPosts(res.data || [])
      } catch (err) {
        console.error('Error al cargar tus posts:', err)
        setPosts([])
      } 

    })()
        fetchData()
  }, [user, loading, navigate])

  // Elimina un post y actualiza el estado local sin recargar
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este post?')) return
    try {
      await deletePostById(id)
      setPosts(prev => prev.filter(p => p._id !== id))
    } catch (err) {
      console.error('Error eliminando post:', err)
    }
  }

  // Edita título/descr. vía prompt, hace PATCH y sincroniza el estado con la respuesta
  const handleEdit = async (post) => {
    const title = prompt('Nuevo título:', post.title)
    const description = prompt('Nueva descripción:', post.description)
    if (title == null && description == null) return
    const payload = {}
    if (title !== null) payload.title = title
    if (description !== null) payload.description = description

    try {
      const res = await updatePostById(post._id, payload)
      const updated = res.data || {}
      setPosts(prev =>
        prev.map(p => (p._id === post._id ? { ...p, ...updated } : p))
      )
      alert('Post actualizado con éxito')
    } catch (err) {
      console.error('Error editando post:', err)
      alert('Hubo un error al actualizar el post ❌')
    }
  }

  if (loading) return <p>Cargando...</p>

  return (

    <section className={styles.body}>
      {/* Cabecera del perfil con avatar, saludo y métricas simples */}
      <section className={`${styles.section} ${styles.profile}`}>
        <div className={styles.card}>
          <div className={styles.card}>
             <img className={styles.avatar} src={user.avatarUrl} alt={user.fullName} />
            <div>
              <p className="name">Hola, {user.fullName}</p>
              <span className="hint">Miembro desde 2024</span>
            </div>
          </div>
          <div className="stats">
            <div className="stat"><b>12</b><span className="hint">Posts</span></div>
            <div className="stat"><b>5</b><span className="hint">Matches</span></div>
          </div>
        </div>

        <div className={styles.card}>
          <p className={styles.h2}>Consejo rápido</p>
          <p className="hint">Un buen título + presupuesto realista aumentan los matches.</p>
        </div>
      </section>

      {/* Listado de mis posts + formulario para publicar uno nuevo */}
      <section className={`${styles.section} ${styles.form}`}>
 <div className={styles.card}>
      <h1>Tus publicaciones</h1>

      {posts.length > 0 ? (
        posts.map(post => (
          <MyPost
            key={post._id}
            post={post}
            user={user}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      ) : (
        <p>No has publicado ningún post.</p>
      )}

        </div>
        <PostForm />
      </section>
    </section>
  );
};

export default UserPage;
