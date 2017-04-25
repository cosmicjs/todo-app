import React from 'react';

const Section = (props) => {
  return (
    <section id="one" className="wrapper style2 special">
      <header className="major">
        <h2>Sed ipsum magna lorem tempus amet<br />
          vehicula et gravida elementum</h2>
      </header>
      <ul className="icons major">
        <li><span className="icon fa-camera-retro"><span className="label">Shoot</span></span></li>
        <li><span className="icon fa-refresh"><span className="label">Process</span></span></li>
        <li><span className="icon fa-cloud"><span className="label">Upload</span></span></li>
      </ul>
    </section>
  );
}

export default Section;