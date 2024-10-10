import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { supabase } from "./supabaseClient";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./navbar";
import LiveLoads from "./LiveLoads";
import CustomerProspects from "./CustomerProspects";
import HomePage from "./HomePage";
import LearnToPlay from "./LearnToPlay"; // Import the new LearnToPlay component

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar session={session} />

      <Routes>
        <Route
          path="/login"
          element={!session ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!session ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/live-load-board"
          element={session ? <LiveLoads /> : <Navigate to="/login" />}
        />
        <Route
          path="/customer-prospects"
          element={session ? <CustomerProspects /> : <Navigate to="/login" />}
        />
        <Route path="/learn-to-play" element={<LearnToPlay />} />
      </Routes>
    </Router>
  );
};

export default App;
