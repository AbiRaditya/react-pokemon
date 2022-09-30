import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="nav-bar-horizontal">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>{/* <a href="#news">News</a> */}</li>
        <li>{/* <a href="#contact">Contact</a> */}</li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
