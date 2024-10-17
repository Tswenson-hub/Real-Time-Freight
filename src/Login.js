import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [authView, setAuthView] = useState("sign_in");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          navigate("/");
        } else if (event === "SIGNED_OUT") {
          navigate("/login");
        }
      }
    );

    // Check the initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [navigate]);

  const toggleAuthView = () => {
    setAuthView(authView === "sign_in" ? "sign_up" : "sign_in");
  };

  const handleSignUp = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      console.log("User signed up successfully:", data);
    } catch (error) {
      console.error("Error signing up:", error.message);
      // Display this error message to the user
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>{authView === "sign_in" ? "Welcome Back" : "Create an Account"}</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["discord"]}
          view={authView}
          onSignUp={handleSignUp}
        />
      </div>
    </div>
  );
}

export default Login;
