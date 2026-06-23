import styles from './feed.card.module.css'

// Componente que muestra la información de un post en forma de tarjeta
const FeedCard = ({ post }) => {
  const author = post.userId

  // Html generada con ayuda de IA y revisados manualmente
  return (
    <>
      <div className={styles.card}>
        {/* Fecha de publicación */}
        <span className={styles.ribbon}>
          {new Date(post.createdAt).toLocaleDateString()}
        </span>

        {/* Título del post */}
        <h1 className={styles.name}>{post.title}</h1>
        <div>
          {post.preferences?.noSmokers && (
            <span className={styles.badge}>No fumadores</span>
          )}

          {post.preferences?.pets && (
            <span className={styles.badge}>Permite animales</span>
          )}

          {post.preferences?.workFromHome && (
            <span className={styles.badge}>Teletrabaja</span>
          )}

          {post.preferences?.ensuite && (
            <span className={styles.badge}>Baño propio</span>
          )}
        </div>

        {/* Contenido principal */}
        <div className={styles.item}>
          {/* Avatar del usuario */}
          <img className={styles.avatar} src={author.avatarUrl} alt={author.fullName} />

          <div>
            {/* Nombre, edad y ciudad */}
            <h3 className={styles.name}>
              {author.fullName}
              {author.age && `, ${author.age}`} · {post.city}
            </h3>

            {/* Ocupación, duración y presupuesto del post */}
            <p className={styles.meta}>
              {author.ocupation || "Ocupación no especificada"}
              {post.duration ? ` · ${post.duration} meses` : ""}
              {post.budget ? ` · ${post.budget} €/mes` : ""}
            </p>

            {/* Descripción del post */}
            <p className={styles.desc}>{post.description}</p>

            {/* Botones de interacción con el usuario */}
            <div className={styles.actions}>
              <button className={styles.btnghost}>👋 Saludar</button>
              <button className={styles.btnghost}>💬 Mensaje</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeedCard
