import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © {year} Starter School. All rights reserved.
        </p>

        <p className="footer-credit">
          Built with ❤️ for education excellence
        </p>
      </div>
    </footer>
  );
};

export default Footer;
