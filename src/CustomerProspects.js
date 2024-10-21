import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Modal, Button, Alert, Table } from "react-bootstrap";

const CustomerProspects = () => {
  const [prospects, setProspects] = useState([]);
  const [selectedProspect, setSelectedProspect] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [prospectingError, setProspectingError] = useState(null);
  const [prospectingSuccess, setProspectingSuccess] = useState(false);

  useEffect(() => {
    fetchProspects();
    fetchUserProfile();

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

  const fetchUserProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
      } else {
        setUserProfile(data);
      }
    }
  };

  const handleRowClick = (prospect) => {
    setSelectedProspect(prospect);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProspect(null);
    setProspectingError(null);
    setProspectingSuccess(false);
  };

  const handleProspect = async () => {
    if (userProfile.hours < 5) {
      setProspectingError("Not enough hours available for prospecting.");
      return;
    }

    const { error } = await supabase.rpc("deduct_prospecting_hours", {
      user_id: userProfile.id,
      hours_to_deduct: 5,
    });

    if (error) {
      console.error("Error during prospecting:", error);
      setProspectingError(
        "An error occurred during prospecting. Please try again."
      );
    } else {
      setUserProfile({ ...userProfile, hours: userProfile.hours - 5 });
      setProspectingSuccess(true);
      // Here you could add logic to update the prospect's status or add a note
    }
  };

  return (
    <div className="container mt-4">
      <h2>Customer Prospects</h2>
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
          {prospects.map((prospect) => (
            <tr
              key={prospect.id}
              onClick={() => handleRowClick(prospect)}
              style={{ cursor: "pointer" }}
            >
              <td>{prospect.company_name}</td>
              <td>{prospect.contact_person}</td>
              <td>{prospect.email}</td>
              <td>{prospect.phone}</td>
              <td>{prospect.industry}</td>
              <td>{prospect.estimated_shipping_needs}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProspect?.company_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProspect && (
            <>
              <p>
                <strong>Contact Person:</strong>{" "}
                {selectedProspect.contact_person}
              </p>
              <p>
                <strong>Email:</strong> {selectedProspect.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedProspect.phone}
              </p>
              <p>
                <strong>Industry:</strong> {selectedProspect.industry}
              </p>
              <p>
                <strong>Estimated Shipping Needs:</strong>{" "}
                {selectedProspect.estimated_shipping_needs}
              </p>
              <hr />
              <p>Available Hours: {userProfile?.hours || 0}</p>
              {prospectingError && (
                <Alert variant="danger">{prospectingError}</Alert>
              )}
              {prospectingSuccess && (
                <Alert variant="success">
                  Prospecting successful! 5 hours deducted.
                </Alert>
              )}
              <Button
                variant="primary"
                onClick={handleProspect}
                disabled={userProfile?.hours < 5 || prospectingSuccess}
              >
                Prospect (Cost: 5 hours)
              </Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerProspects;
