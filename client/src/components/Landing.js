import React from "react";

const Landing = () => {
  return (
    <div className='row'>
    <div style={{ textAlign: "center" }} className='col s8 offset-s2'>
      <h1>Emaily!</h1>
      <h4>Feedback Collection Application</h4>
      <p>Full stack web application that profiles the advanced features of<br/>React, Redux, Express, Mongo.</p>
      <p>
        The idea of application is to allow a startup owner/product manager receive feedback on their product.
        It will enable them to quickly and easily send out bulk email messages to a bunch of different users to collect some amount of feedback.
      </p>
    </div>
    <div className="divider" />
    <div className="section col s8 offest-s2" >
      App User Walkthrough
      <ol>
        <li>User signs up via Google OAuth</li>
        <li>User pays for email credit via Stripe</li>
        <li>User creates a new survey</li>
        <li>User enters list of emails to send survey to</li>
        <li>The app sends email to list of surveyees</li>
        <li>Surveyees click on link in email to provide feedback</li>
        <li>The app tabulates feedback</li>
        <li>User can see report of all survey responses</li>
      </ol>
    </div>
    </div>
  );
};

export default Landing;

// Handling Emails (stripe), Billing, user accounts - authenthication
