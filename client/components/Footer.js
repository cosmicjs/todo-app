import React from 'react';

const Footer = (props) => {
  return (
    <footer id="footer">
      <ul className="icons">
        <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
        <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
        <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
      </ul>
      <p className="copyright">&copy; Untitled. Credits: <a href="http://html5up.net">HTML5 UP</a></p>
    </footer>
  );
};

export default Footer;