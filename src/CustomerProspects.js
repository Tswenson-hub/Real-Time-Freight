import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const CustomerProspects = () => {
  const [prospects, setProspects] = useState([]);

  useEffect(() => {
    // Fetch initial data
    fetchProspects();

    // Set up real-time subscription
    const subscription = supabase
      .channel("customer_prospects")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "customer_prospects" },
        (payload) => {
          console.log("Change received!", payload);
          fetchProspects();
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProspects = async () => {
    const { data, error } = await supabase
      .from("customer_prospects")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching prospects:", error);
    } else {
      setProspects(data);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Customer Prospects</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Contact Person</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Industry</th>
            <th>Estimated Shipping Needs</th>
          </tr>
        </thead>
        <tbody>
          {prospects.map((prospect) => (
            <tr key={prospect.id}>
              <td>{prospect.id}</td>
              <td>{prospect.company_name}</td>
              <td>{prospect.contact_person}</td>
              <td>{prospect.email}</td>
              <td>{prospect.phone}</td>
              <td>{prospect.industry}</td>
              <td>{prospect.estimated_shipping_needs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerProspects;
