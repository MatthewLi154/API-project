import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css";
import Groups from "../Groups";
import SignUpFormModal from "../SignupFormModal";

function Home() {
  const history = useHistory();
  return (
    <>
      <div className="homeContainer">
        <div className="upperSection">
          <div className="upperSectionleftText">
            <h1>Celebrate 12 years of real Anime connections on Weeb Up</h1>
            <p>
              Looking for your next anime convention or small watch party?
              Weebup can help. For 12 years, people have turned to Weebup to
              fullfill their anime voids, make lasting friendships, and discover
              the latest anime trends. Thousands of events, thousands of groups,
              what are you waiting for?
            </p>
          </div>
          <div className="upperSectionRightImg">
            <span>
              <img
                className="homeImg"
                src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=640"
              ></img>
            </span>
          </div>
        </div>
        <div className="middleSection">
          <div className="middleSectionUpperText">
            <h2>How Weebup works</h2>
          </div>
          <div className="middleSectionLowerText">
            <p>
              Meet new people who share your interests through online and
              in-person events. It's free to create an account.
            </p>
          </div>
        </div>
        <div className="lowerSection">
          <div className="joinAGroup">
            <img src="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=384"></img>
            <div>
              <NavLink
                to="/groups"
                style={{
                  textDecoration: "none",
                  color: "rgb(00, 82, 94)",
                }}
              >
                See all groups
              </NavLink>
            </div>
            <p>
              Watch what you love, meet others who love it as well, find your
              community.
            </p>
          </div>
          <div className="findAnEvent">
            <img src="https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=384"></img>
            <div>
              <NavLink
                to="/events"
                style={{
                  textDecoration: "none",
                  color: "rgb(00, 82, 94)",
                }}
              >
                Find an Event
              </NavLink>
            </div>
            <p>
              Events are happening right now, from online workshops and maid
              cafes!
            </p>
          </div>
          <div className="startAGroup">
            <img src="https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=384"></img>
            <div>
              <NavLink
                to="/groups/create"
                style={{
                  textDecoration: "none",
                  color: "rgb(00, 82, 94)",
                }}
              >
                Start a group
              </NavLink>
            </div>
            <p>
              You don't have to be an expert to gather people together and
              explore shared interests.
            </p>
          </div>
        </div>
        <div className="buttonContainer">
          <div
            className="joinWeebUpButton"
            onClick={(e) => {
              e.preventDefault();
              history.push("/groups/create");
            }}
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            Join Weebup
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
