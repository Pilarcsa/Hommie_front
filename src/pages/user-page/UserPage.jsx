import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/user-context.jsx';
import { getPostsByUserId, deletePostById, updatePostById } from '../../service/api/post-api-service.js';
import PostForm from '../../components/post-form-components/PostForm.jsx';
import MyPost from '../../components/user-components/MyPost.jsx';
import styles from './user.module.css';

// Página de perfil: protege la ruta y carga los posts del usuario autenticado
// Html generada con ayuda de IA y revisados manualmente
const UserPage = () => {

  const { user, loading, logoutUser } = useUserContext()
  const [posts, setPosts] = useState([])
  // Añadir junto a los otros useState al inicio del componente
  const [confirmId, setConfirmId] = useState(null)   // id del post a eliminar
  const [toast, setToast] = useState('')              // mensaje de éxito/error

    const searchPost = async() => {
     try {
        const res = await getPostsByUserId(user._id);

        setPosts(Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []));
        console.log('Posts:', res.data);

      } catch (err) {
        console.error('Error al cargar tus posts:', err);
        setPosts([]);
      }}

  // Al montar: si no hay usuario, redirige; si hay, pide sus posts al backend
  if (!loading && !user) return <Navigate to="/login" replace />
  useEffect(() => {
    (async () => {
      if (!user) return;
      await searchPost();
    })();
  }, [user, loading]);

  console.log("info de los posts", posts)

const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
}

  // Elimina un post y actualiza el estado local sin recargar

  const handleDelete = (id) => {
    setConfirmId(id)  // muestra el modal
  }

  const confirmDelete = async () => {
    try {
      await deletePostById(confirmId)
      setPosts(prev => prev.filter(p => p._id !== confirmId))
      showToast('Post eliminado correctamente')
    } catch (err) {
      console.error('Error eliminando post:', err)
      showToast('Error al eliminar el post')
    } finally {
      setConfirmId(null)  // cierra el modal
    }
  }

  // Edita título/descr. vía prompt, hace PATCH y sincroniza el estado con la respuesta
  const [editingPost, setEditingPost] = useState(null)

  const handleEdit = (post) => {
    setEditingPost({ ...post })  // abre el formulario de edición
  }

  const confirmEdit = async () => {
    try {
      const res = await updatePostById(editingPost._id, {
        title: editingPost.title,
        description: editingPost.description,
      })
      const updated = res.data || {}
      setPosts(prev =>
        prev.map(p => (p._id === editingPost._id ? { ...p, ...updated } : p))
      )
      showToast('Post actualizado con éxito')
    } catch (err) {
      console.error('Error editando post:', err)
      showToast('Error al actualizar el post')
    } finally {
      setEditingPost(null)
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
              <button className={styles.btnghost} onClick={logoutUser}>Cerrar perfil</button>
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

          {loading ? (
            <p>Cargando tus publicaciones...</p>
          ) : posts.length > 0 ? (
            posts.map(post => (
              <MyPost
                key={post._id || post.id}
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
      <PostForm searchPost={searchPost} />
      
        {/* Toast de notificación */}
{toast && (
    <div className={styles.toast}>
        {toast}
    </div>
)}

{/* Modal de confirmación de borrado */}
{confirmId && (
    <div className={styles.modalOverlay}>
        <div className={`${styles.modalContent} ${styles.confirmModal}`}>
            <p>¿Seguro que quieres eliminar este post?</p>
            <div className={styles.confirmButtons}>
                <button onClick={confirmDelete}>Sí, eliminar</button>
                <button onClick={() => setConfirmId(null)}>Cancelar</button>
            </div>
        </div>
    </div>
)}

{/* Modal de edición inline */}
{editingPost && (
    <div className={styles.modalOverlay}>
        <div className={`${styles.modalContent} ${styles.editModal}`}>
            <h3>Editar post</h3>
            <label>
                Título
                <input
                    value={editingPost.title}
                    onChange={e => setEditingPost(p => ({ ...p, title: e.target.value }))}
                    className={styles.input}
                />
            </label>
            <label>
                Descripción
                <textarea
                    value={editingPost.description}
                    onChange={e => setEditingPost(p => ({ ...p, description: e.target.value }))}
                    className={styles.textarea}
                />
            </label>
            <div className={styles.editButtons}>
                <button onClick={confirmEdit}>Guardar</button>
                <button onClick={() => setEditingPost(null)}>Cancelar</button>
            </div>
        </div>
    </div>
)}
      </section>
    </section>
  );

};
export default UserPage;
