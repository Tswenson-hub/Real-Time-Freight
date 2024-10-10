import React, { useState } from "react";
import "./LearnToPlay.css";

const FlipCard = ({ title, content }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h2>{title}</h2>
        </div>
        <div className="flip-card-back">
          <div className="content">{content}</div>
        </div>
      </div>
    </div>
  );
};

const LearnToPlay = () => {
  const sections = [
    {
      title: "Why is this a real-time simulation?",
      content: (
        <>
          <ul>
            <li>
              "We-Teach-Freight" offers the same customers and loads to all
              players across the game.
            </li>
            <li>
              Don't expect the perfect load to be waiting for you all the time
              or an amazing customer to magically appear.
            </li>
            <li>
              Users who watch the real-time boards more tend to be more
              successful.
            </li>
            <li>There is no pattern to when these boards are updated.</li>
          </ul>
        </>
      ),
    },
    {
      title: "What is your goal?",
      content: (
        <>
          <p>
            <strong>Make profit while increasing customer satisfaction</strong>
          </p>
          <p>
            <em>(Much easier said than done.)</em>
          </p>
          <ul>
            <li>
              Sell freight to customers at a higher rate than your carrier
              costs.
            </li>
            <li>
              Maintain customer satisfaction by communicating issues promptly.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "How do I get customers?",
      content: (
        <>
          <p>Start with a few customers (be grateful!).</p>
          <ul>
            <li>Expect tight margins initially.</li>
            <li>
              Prospect for new customers using your weekly 40 hours of "time".
            </li>
            <li>Maintain a good satisfaction score to attract customers.</li>
          </ul>
          <p>Act fast! The best customers go quickly.</p>
        </>
      ),
    },
    {
      title: "How do I move a customer's load?",
      content: (
        <>
          <ul>
            <li>Contract a carrier (no need to borrow a truck).</li>
            <li>Monitor the load board for new opportunities.</li>
            <li>Read load descriptions carefully for special requirements.</li>
          </ul>
          <p>
            <strong>Rookie tip:</strong> Attention to detail saves time and
            money!
          </p>
        </>
      ),
    },
    {
      title: "My load is in-progress!",
      content: (
        <>
          <p>Don't celebrate yet! Stay vigilant:</p>
          <ul>
            <li>Address issues and claims promptly.</li>
            <li>Communicate effectively with customers.</li>
            <li>Quick problem-solving can actually improve satisfaction.</li>
          </ul>
        </>
      ),
    },
    {
      title: "My load has delivered!",
      content: (
        <>
          <p>Congratulations! But the job's not over:</p>
          <ul>
            <li>Ensure the load was profitable.</li>
            <li>Check your account for the payment.</li>
            <li>Ready for the next challenge? Start again!</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="learn-to-play-container">
      <h1 className="main-title">Learn to Play: We Teach Freight</h1>

      <div className="intro-card">
        <h2>Welcome, Rookie Broker!</h2>
        <p>
          Welcome to your first day as a freight broker! We-Teach-Freight is a
          real-time simulation game that aims to simulate the fast-paced
          environment that freight brokers encounter every day.
        </p>
      </div>

      <div className="flip-cards-container">
        {sections.map((section, index) => (
          <FlipCard
            key={index}
            title={section.title}
            content={section.content}
          />
        ))}
      </div>
    </div>
  );
};

export default LearnToPlay;
