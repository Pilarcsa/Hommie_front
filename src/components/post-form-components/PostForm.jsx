import styles from './post.module.css'
import { createPost } from '../../service/api/post-api-service.js'
import { useRef } from 'react'
// Componente de formulario para crear un nuevo post
const PostForm = ({ searchPost }) => {

  const formRef = useRef(null)
  const handleSubmit = async (e) => {
  e.preventDefault();
  const fd = new FormData(formRef.current)  

    // Crea el objeto post con los datos del formulario
    const post = {
      userId: fd.get('userId') ? Number(fd.get('userId')) : undefined,
      fullName: fd.get('fullName') || '',
      email: fd.get('email') || '',
      avatarUrl: fd.get('avatarUrl') || '',
      age: fd.get('age') ? Number(fd.get('age')) : undefined,
      occupation: fd.get('occupation') || '',
      title: fd.get('title') || '',
      description: fd.get('description') || '',
      city: fd.get('city') || '',
      budget: fd.get('budget') ? Number(fd.get('budget')) : undefined,
      duration: fd.get('duration') ? Number(fd.get('duration')) : null,
      mode: fd.get('mode') || 'solo',
      rent: fd.get('rent') || 'sin piso',
      status: fd.get('status') || 'published',
    };

    // Añade preferencias según los checkboxes
    post.preferences = {
      noSmokers: fd.get('noSmokers') !== null,
      pets: fd.get('pets') !== null,
      workFromHome: fd.get('workFromHome') !== null,
      ensuite: fd.get('ensuite') !== null,
    };

    const photoUrl = fd.get('photoUrl') || '';

    await createPost(post);
    
    formRef.current.reset()  
    if (searchPost) searchPost()  // Actualiza la lista de posts si se pasa la función
  };
// Html generada con ayuda de IA y revisados manualmente
  return (
    <>
      <section className={styles.card}>
        <div>
          <h1 className="h1">Publicar un post</h1>
          <p className="muted">Completa la información del anuncio y publícalo.</p>
        </div>
        <form ref={formRef} className={styles.card} onSubmit={handleSubmit} noValidate>
          {/* Campos principales del post */}
          <div className={styles.group}>
            <label htmlFor="title" className={styles.h2}>Título</label>
            <input className={styles.input} id="title" name="title" type="text" placeholder="Ej. Busco compi para piso en Lavapiés" />
          </div>

          <div className={styles.group}>
            <label htmlFor="city" className={styles.label}>Ciudad o zona</label>
            <input className={styles.input} id="city" name="city" type="text" placeholder="Madrid, Barcelona…" />
          </div>

          <div className={styles.group}>
            <label htmlFor="budget" className={styles.label}>Presupuesto mensual (€)</label>
            <input className={styles.input} id="budget" name="budget" type="number" min="0" placeholder="500" />
          </div>

          <div className={styles.group}>
            <label htmlFor="duration" className={styles.label}>Duración (meses)</label>
            <input className={styles.input} id="duration" name="duration" type="number" min="1" placeholder="6" />
          </div>

          <div className={styles.group}>
            <label htmlFor="description" className={styles.label}>Descripción</label>
            <textarea id="description" name="description" className={styles.textarea}
              placeholder="Cuenta cómo eres, cómo es el piso ideal y qué tipo de convivencia buscas…" maxLength={800} />
          </div>

          {/* Selección de modalidad */}
          <div className={styles.group}>
            <span className={styles.label}>Modalidad</span>
            <div className={styles.divbtn} role="radiogroup" aria-label="modalidad">
              <label className={styles.pill}>
                <input type="radio" name="mode" value="solo" defaultChecked /> 👤 Solo
              </label>
              <label className={styles.pill}>
                <input type="radio" name="mode" value="pareja" /> 👥 En pareja
              </label>
            </div>
          </div>

          {/* Tipo de alquiler */}
          <div className={styles.group}>
            <span className={styles.label}>Alquiler</span>
            <div className={styles.divbtn} role="radiogroup" aria-label="alquiler">
              <label className={styles.pill}>
                <input type="radio" name="rent" value="sin piso" defaultChecked /> Buscando piso en alquiler
              </label>
              <label className={styles.pill}>
                <input type="radio" name="rent" value="con piso en alquiler" /> Con piso en alquiler
              </label>
            </div>
          </div>

          {/* Preferencias adicionales */}
          <div className={styles.group}>
            <span className={styles.label}>Preferencias</span>
            <div className={styles.checks}>
              <label className={styles.check}>
                <input className={styles.checkinput} type="checkbox" name="noSmokers" /> No fumadores
              </label>
              <label className={styles.check}>
                <input className={styles.checkinput} type="checkbox" name="pets" /> Con mascotas
              </label>
              <label className={styles.check}>
                <input className={styles.checkinput} type="checkbox" name="workFromHome" /> Teletrabajo
              </label>
              <label className={styles.check}>
                <input className={styles.checkinput} type="checkbox" name="ensuite" /> Baño propio
              </label>
            </div>
          </div>

          {/* Foto opcional */}
          <div className={styles.group}>
            <label htmlFor="photoUrl" className={styles.label}>Foto (URL opcional)</label>
            <input className={styles.input} id="photoUrl" name="photoUrl" type="url" placeholder="https://..." />
          </div>

          {/* Botones de acción */}
          <div className={styles.divbtn}>
            <button className={styles.btn} type="submit">Publicar</button>
            <button className={styles.btnghost} type="reset">Limpiar</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default PostForm;
