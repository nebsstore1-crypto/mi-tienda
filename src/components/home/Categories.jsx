import "../../styles/categories.css";
import { Link } from "react-router-dom";

function Categories() {
  return (
    <section className="categories">

      <h2>Nuestras Categorías</h2>

      <div className="cards">

        <div className="card">
          <div className="icon">👞</div>
          <h3>Hombre</h3>
          <p>Calzado deportivo y casual.</p>
          <Link to="/hombre">Ver productos</Link>
        </div>

        <div className="card">
          <div className="icon">👠</div>
          <h3>Mujer</h3>
          <p>Moda y comodidad para cada ocasión.</p>
          <Link to="/mujer">Ver productos</Link>
        </div>

        <div className="card">
          <div className="icon">👟</div>
          <h3>Niño</h3>
          <p>Diseños resistentes y cómodos.</p>
          <Link to="/nino">Ver productos</Link>
        </div>

      </div>

    </section>
  );
}

export default Categories;