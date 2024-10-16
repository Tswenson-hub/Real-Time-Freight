import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("Fetched user:", user);

      if (user) {
        const { data, error } = await supabase
          .from("profile")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          // If profile doesn't exist, create a new one
          const { data: newProfile, error: insertError } = await supabase
            .from("profile")
            .insert([
              {
                id: user.id,
                hours: 0,
                profit: 0,
                active_loads: 0,
                completed_loads: 0,
              },
            ])
            .single();

          if (insertError) {
            throw insertError;
          }
          setProfile(newProfile);
        } else {
          setProfile(data);
        }
      }
    } catch (error) {
      console.error("Error in profile fetch/create:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>No profile data found.</div>;
  }

  return (
    <div className="container mt-5">
      <h2>User Profile</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Profile Statistics</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Hours Played: {profile.hours}</li>
            <li className="list-group-item">
              Total Profit: ${profile.profit.toFixed(2)}
            </li>
            <li className="list-group-item">
              Active Loads: {profile.active_loads}
            </li>
            <li className="list-group-item">
              Completed Loads: {profile.completed_loads}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
