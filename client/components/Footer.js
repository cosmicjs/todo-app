import React from 'react';

const Footer = (props) => {
  return (
    <footer id="footer">
      <div className="row">
        <div className="col-xs-12 text-center">
          <a href="https://cosmicjs.com" style={{textDecoration: "none", borderBottom: "none"}}>
            <img src="https://cosmicjs.com/images/logo.svg"/>
            <p>Proudly powered by Cosmic JS</p>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;