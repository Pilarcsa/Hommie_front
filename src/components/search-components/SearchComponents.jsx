import styles from './search.components.module.css'

// Componente de barra de búsqueda para filtrar posts por ubicación, fecha y tipo /
// Html generada con ayuda de IA y revisados manualmente
const SearchComponents = () => {
    return (
        <>
            <div className={styles.search}>
                {/* Campo para la ubicación */}
                <div className={styles.location}>
                    <strong>Ubicación</strong>
                    <input id="f-city" className={styles.input} placeholder="Madrid, Barcelona…" />
                </div>

                {/* Filtro por mes de inicio */}
                <input id="f-start" type="month" className={styles.input} />

                {/* Botones para seleccionar modalidad */}
                <button data-chip="solo" className={styles.pill}><span>👤</span> solo</button>
                <button data-chip="pareja" className={styles.pill}><span>👥</span> en pareja</button>

                {/* Botón principal de búsqueda */}
                <button id="searchBtn" className={styles.btn}>Buscar compañero de piso</button>
            </div>
        </>
    )
}

export default SearchComponents
