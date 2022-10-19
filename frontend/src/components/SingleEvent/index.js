import React, { useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./SingleEvent.css";
import { fetchAllEvents, fetchSingleEvent } from "../../store/events";

const SingleEvent = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();

  const singleEventObj = useSelector((state) => state.events.singleEvent);

  useEffect(() => {
    dispatch(fetchAllEvents());
    dispatch(fetchSingleEvent(eventId));
  }, [dispatch]);

  return (
    <>
      {singleEventObj && (
        <div className="eventDetailsPageContainer">
          <div className="eventHeader">
            <div className="singleEventTitle">
              <h1>{singleEventObj.name}</h1>
            </div>
            <div className="hostSection">
              <div className="hostPicture">
                <img src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"></img>
              </div>
              <div className="hostedByOrganizerSection">
                <div className="hostedBy">
                  <h3>Hosted by</h3>
                </div>
                <div className="hostName">
                  <h3>{singleEventObj.Group?.name}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="middleSectionEventDetails">
            <div className="eventDetailsLeft">
              <div>
                {singleEventObj.EventImages?.length ? (
                  <img src={singleEventObj.EventImages[0]?.url}></img>
                ) : (
                  <img src="https://thumbs.dreamstime.com/b/text-upcoming-events-written-notepad-office-desk-comput-text-upcoming-events-written-notepad-office-desk-118864463.jpg"></img>
                )}
              </div>
              <div>
                <h2>Details</h2>
              </div>
              <div>
                <p>{singleEventObj.description}</p>
              </div>
            </div>
            <div className="eventDetailsRight"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleEvent;
