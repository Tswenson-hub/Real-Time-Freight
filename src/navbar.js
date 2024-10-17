import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const Navbar = ({ session }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Navbar session state:", session);
    if (session && session.user) {
      console.log("User ID:", session.user.id);
      console.log("User email:", session.user.email);
      console.log("Auth provider:", session.user.app_metadata.provider);
    }
  }, [session]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          We Teach Freight
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/learn-to-play">
                Learn to Play
              </Link>
            </li>
            {session ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/live-load-board">
                    Live Load Board
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/customer-prospects">
                    Customer Prospects
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
