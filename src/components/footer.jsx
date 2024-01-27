import React from 'react';
import BrillaLogo from '../assets/brillam.png'
import {FaBell} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer>
      <div className='notficationDiv'>
          <p><FaBell className="iconSize"/>Notification</p>
        </div>
    </footer>
  );
};

export default Footer;