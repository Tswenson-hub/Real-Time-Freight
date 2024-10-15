import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

function ResetPassword() {
  const [resetToken, setResetToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ResetPassword component mounted");
    const hash = window.location.hash;
    console.log("Hash in ResetPassword:", hash);
    const params = new URLSearchParams(hash.slice(1));
    const type = params.get("type");
    const token = params.get("access_token");
    console.log("Type:", type, "Token:", token);

    if (type === "recovery" && token) {
      console.log("Setting reset token");
      setResetToken(token);
      supabase.auth.setSession({
        access_token: token,
        refresh_token: params.get("refresh_token"),
      });
    }
  }, []);

  const handlePasswordReset = async (newPassword) => {
    console.log("Attempting to reset password");
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      console.log("Password reset successful");
      alert("Password reset successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Password reset error:", error);
      alert("Error resetting password: " + error.message);
    }
  };

  console.log("Rendering ResetPassword. resetToken:", resetToken);

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={[]}
        view={resetToken ? "update_password" : "forgot_password"}
        onPasswordUpdate={handlePasswordReset}
      />
    </div>
  );
}

export default ResetPassword;
