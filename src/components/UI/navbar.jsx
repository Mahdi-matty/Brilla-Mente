export default function Nav({ links }) {
  return (
    <nav className="navbar">
        <ul className="">
          {links.map((link) => link)}
        </ul>
    </nav>
  );
};