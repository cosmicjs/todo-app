import React from 'react';

const Header = (props) => {
  return (
    <header id="header">
      <div className="content">
        <h1><a href="#">Fractal</a></h1>
        <p>Just a simple, single page responsive<br />
          template brought to you by <a href="http://html5up.net">HTML5 UP</a></p>
        <ul className="actions">
          <li><a href="#" className="button special icon fa-download">Download</a></li>
          <li><a href="#one" className="button icon fa-chevron-down scrolly">Learn More</a></li>
        </ul>
      </div>
      <div className="image phone"><div className="inner"><img src="images/screen.jpg" alt="" /></div></div>
    </header>
  );
}

export default Header