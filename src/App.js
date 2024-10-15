import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { supabase } from "./supabaseClient";
import Login from "./Login";
import Navbar from "./navbar";
import LiveLoads from "./LiveLoads";
import CustomerProspects from "./CustomerProspects";
import HomePage from "./HomePage";
import LearnToPlay from "./LearnToPlay";
import ResetPassword from "./ResetPassword";

const App = () => {
  const [session, setSession] = useState(null);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    const isResetting = hash && hash.includes("type=recovery");
    setIsResettingPassword(isResetting);

    if (!isResetting) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const MainContent = () => {
    const location = useLocation();

    useEffect(() => {
      const hash = window.location.hash;
      console.log("Current hash:", hash);
      const isResetting = hash && hash.includes("type=recovery");
      console.log("Is resetting password:", isResetting);
      setIsResettingPassword(isResetting);

      if (isResetting) {
        // Clear the session when resetting password
        supabase.auth.signOut();
        setSession(null);
      }
    }, [location]);

    console.log(
      "Rendering MainContent. isResettingPassword:",
      isResettingPassword
    );

    if (isResettingPassword) {
      console.log("Rendering ResetPassword component");
      return <ResetPassword />;
    }

    return (
      <>
        <Navbar session={session} />
        <Routes>
          <Route
            path="/login"
            element={!session ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/live-load-board"
            element={session ? <LiveLoads /> : <Navigate to="/" />}
          />
          <Route
            path="/customer-prospects"
            element={session ? <CustomerProspects /> : <Navigate to="/login" />}
          />
          <Route path="/learn-to-play" element={<LearnToPlay />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </>
    );
  };

  return (
    <Router>
      <MainContent />
    </Router>
  );
};

export default App;
