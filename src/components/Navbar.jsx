import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Avatar = ({ user, logout }) => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={user.photoURL} alt={user.displayName} />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <a href="/" className="justify-between">
            Profile
          </a>
        </li>
        <li>
          <a href="/">Settings</a>
        </li>
        <li>
          <button onClick={logout}>Sign out</button>
        </li>
      </ul>
    </div>
  );
};

const Navbar = () => {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          twooter🐣
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>

        {user.loggedIn ? (
          <Avatar user={user} logout={logout} />
        ) : (
          <button className="btn btn-secondary" onClick={login}>
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
