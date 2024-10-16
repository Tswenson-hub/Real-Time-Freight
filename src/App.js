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
import Navbar from "./navbar";
import LiveLoads from "./LiveLoads";
import CustomerProspects from "./CustomerProspects";
import HomePage from "./HomePage";
import LearnToPlay from "./LearnToPlay";
import Profile from "./Profile";

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        console.log("Initial session:", session);
        ensureUserProfile(session.user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session);
      setSession(session);
      if (session) {
        ensureUserProfile(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const ensureUserProfile = async (user) => {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error || !data) {
      // Profile doesn't exist, create it
      const { error: insertError } = await supabase
        .from("profile")
        .insert([
          {
            id: user.id,
            hours: 0,
            profit: 0,
            active_loads: 0,
            completed_loads: 0,
          },
        ]);

      if (insertError) {
        console.error("Error creating user profile:", insertError);
      }
    }
  };

  return (
    <Router>
      <Navbar session={session} />
      <Routes>
        <Route
          path="/login"
          element={!session ? <Login /> : <Navigate to="/" />}
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
        <Route
          path="/profile"
          element={session ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/learn-to-play" element={<LearnToPlay />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
