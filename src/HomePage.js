import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h1 className="display-4 fw-bold">We Teach Freight</h1>
          <p className="lead fw-normal">
            The ultimate freight broker simulation game.
          </p>
          <Link to="/signup" className="btn btn-primary btn-lg">
            Get Started
          </Link>
        </div>
        <div className="product-device shadow-sm d-none d-md-block"></div>
        <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>

      {/* SVG Animation */}
      <div className="svg-animation-container my-5">
        <img src="semi-truck.png" alt="Animated PNG" className="animated-svg" />
      </div>

      {/* Features Section */}
      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Why Choose Us</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="col">
            <div className="card h-100 bg-dark text-white shadow">
              <div className="card-body">
                <div className="feature-icon bg-primary bg-gradient mb-3">
                  <svg className="bi" width="1em" height="1em">
                    <use xlinkHref="#collection" />
                  </svg>
                </div>
                <h3 className="card-title">Live Load Board</h3>
                <p className="card-text">
                  Access real-time updates on available loads and optimize your
                  logistics operations.
                </p>
                <Link
                  to="/live-load-board"
                  className="btn btn-outline-light mt-3"
                >
                  View Load Board
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-dark text-white shadow">
              <div className="card-body">
                <div className="feature-icon bg-primary bg-gradient mb-3">
                  <svg className="bi" width="1em" height="1em">
                    <use xlinkHref="#people-circle" />
                  </svg>
                </div>
                <h3 className="card-title">Customer Prospects</h3>
                <p className="card-text">
                  Manage and track potential customers to grow your freight
                  brokerage business.
                </p>
                <Link
                  to="/customer-prospects"
                  className="btn btn-outline-light mt-3"
                >
                  Explore Prospects
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 bg-dark text-white shadow">
              <div className="card-body">
                <div className="feature-icon bg-primary bg-gradient mb-3">
                  <svg className="bi" width="1em" height="1em">
                    <use xlinkHref="#toggles2" />
                  </svg>
                </div>
                <h3 className="card-title">Learn to Play</h3>
                <p className="card-text">
                  Learn how to take part in the simulation. Learn how to work in
                  the industry.
                </p>
                <a href="learn_to_play" className="btn btn-outline-light mt-3">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
