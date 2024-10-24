import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Table } from "react-bootstrap";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [committedCustomers, setCommittedCustomers] = useState([]);
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
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profile")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) {
          if (profileError.code === "PGRST116") {
            // Profile doesn't exist, create a new one
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

            if (insertError) throw insertError;
            setProfile(newProfile);
          } else {
            throw profileError;
          }
        } else {
          setProfile(profileData);
        }

        // Fetch committed customers
        const { data: customersData, error: customersError } = await supabase
          .from("customer_prospects")
          .select("*")
          .eq("profile_id", user.id);

        if (customersError) throw customersError;
        setCommittedCustomers(customersData);
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
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Profile Statistics</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Remaining Hours: {profile.hours}
            </li>
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

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Committed Customers</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Contact Person</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Industry</th>
                <th>Estimated Shipping Needs</th>
              </tr>
            </thead>
            <tbody>
              {committedCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.company_name}</td>
                  <td>{customer.contact_person}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.industry}</td>
                  <td>{customer.estimated_shipping_needs}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {committedCustomers.length === 0 && (
            <p className="text-center mt-3">
              No committed customers yet. Start prospecting!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
