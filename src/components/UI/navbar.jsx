export default function Nav({ links }) {
  return (
    <nav className="navbarTop">
        <ul className="">
          {links.map((link) => link)}
        </ul>
    </nav>
  );
};