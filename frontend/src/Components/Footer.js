function Footer({ logo }) {
  const data = new Date().getFullYear();
  return (
    <footer className="footer container">
      <p className="footer__author">{`© ${data} Mesto Russia`}</p>
    </footer>
  );
}

export default Footer;
