import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const LiveLoads = () => {
  const [loads, setLoads] = useState([]);

  useEffect(() => {
    // Fetch initial data
    fetchLoads();

    // Set up real-time subscription
    const subscription = supabase
      .channel("loads")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "loads" },
        (payload) => {
          console.log("Change received!", payload);
          fetchLoads();
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchLoads = async () => {
    const { data, error } = await supabase
      .from("loads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching loads:", error);
    } else {
      setLoads(data);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Live Load Board</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Created At</th>
            <th>Weight</th>
            <th>Carrier</th>
            <th>Location</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {loads.map((load) => (
            <tr key={load.id}>
              <td>{load.id}</td>
              <td>{new Date(load.created_at).toLocaleString()}</td>
              <td>{load.Weight}</td>
              <td>{load.Carrier}</td>
              <td>{load.Location}</td>
              <td>{load.Description || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiveLoads;
