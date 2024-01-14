import { Link } from 'react-router-dom';
import Navbar from './UI/Navbar'

export default function Nav() {

    return (
        <Navbar className="navbarNew"
        links={[
          <Link key={1} className="nav-link text-light newNavHead" to="/">
            Home
          </Link>,
          <Link key={2} className="nav-link text-light newNavHead" to="/about">
              About Us
          </Link>,
          <Link key={3} className="nav-link text-light newNavHead" to="/profile">
               profile
          </Link>,
          <Link key={4} className="nav-link text-light newNavHead" to="myPposts">
                Posts
          </Link>,
          <Link key={5} className="nav-link text-light newNavHead" to="/assignments">
               Assignments
          </Link>,
              ]}
  
              />
            );
          }