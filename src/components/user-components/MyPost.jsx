import styles from './my.post.module.css'



const MyPost = ({ post, user, onDelete, onEdit }) => {
  if (!post) return null

  const handleDelete = () => onDelete?.(post._id)
  const handleEdit = () => onEdit?.(post)

 
   return (
     <>
       <div className={styles.card}>
         {/* Fecha de publicación 
         <span className={styles.ribbon}>
           {new Date(post.createdAt).toLocaleDateString()}
         </span>*/}
 
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
           <img className={styles.avatar} src={user.avatarUrl} alt={user.fullName} />
 
           <div>
 
             {/* Nombre, edad y ciudad */}
             <h3 className={styles.name}>
               {user.fullName}
               {user.age && `, ${user.age}`} · {post.city}
             </h3>
 
             {/* Ocupación, duración, presupuesto o detalles adicionales */}
             <p className={styles.meta}>
               {user.ocupation || "Ocupación no especificada"}
               {post.duration ? ` · ${post.duration} meses` : ""}
               {post.budget ? ` · ${post.budget} €/mes` : ""}
             </p>
 
 
             {/* Descripción del post */}
             <p className={styles.desc}>{post.description}</p>
 
 
             <div className={styles.actions}>
              <button className={styles.btnghost} onClick={() => handleEdit(post)}>Editar</button>
              <button className={styles.btnghost} onClick={() => handleDelete(post._id)}>Eliminar</button>
               
             </div>
           </div>
         </div>
       </div>
 
 
     </>
 
   )
 }

export default MyPost;
