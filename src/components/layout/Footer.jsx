import "../../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <p>
        © {new Date().getFullYear()} <strong>NESB </strong>
        </p>

        <p>
          renacer como el ave fenix, siempre con la esperanza de un nuevo comienzo.
        </p>

      </div>

    </footer>
  );
}

export default Footer;