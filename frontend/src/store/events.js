import { csrfFetch } from "./csrf";

// TODO: string for types
const LOAD_ALL_EVENTS = "events/loadAllEvents";
const LOAD_SINGLE_EVENT = "events/loadSingleEvent";
const DELETE_SINGLE_EVENT = "events/deleteSingleEvent";

// TODO: action creators
export const loadAllEvents = (data) => {
  return {
    type: LOAD_ALL_EVENTS,
    events: data,
  };
};

export const loadSingleEvent = (data) => {
  return {
    type: LOAD_SINGLE_EVENT,
    event: data,
  };
};

export const deleteEvent = (data) => {
  return {
    type: DELETE_SINGLE_EVENT,
    eventId: data,
  };
};

// TODO: thunk action creator

export const fetchAllEvents = () => async (dispatch) => {
  const response = await csrfFetch("/api/events");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadAllEvents(data));
    return data;
  }
};

export const fetchSingleEvent = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSingleEvent(data));
    return data;
  }
};

export const deleteSingleEvent = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteEvent(eventId));
    return data;
  }
};

// TODO: reducer

const initialState = { allEvents: {}, singleEvent: {} };

const eventReducer = (state = initialState, action) => {
  let eventStateObj = {};
  switch (action.type) {
    case LOAD_ALL_EVENTS:
      eventStateObj = { ...state };
      // Normalize the data so allEvents state is an object
      action.events.Events.forEach((event) => {
        eventStateObj.allEvents[event.id] = event;
      });
      return eventStateObj;
    case LOAD_SINGLE_EVENT:
      eventStateObj = { ...state };
      // add or replace data to single group obj
      eventStateObj.singleEvent = action.event;
      return eventStateObj;
    case DELETE_SINGLE_EVENT:
      eventStateObj = { ...state };
      //   action.eventId
      delete eventStateObj.allEvents[action.eventId];
      return eventStateObj;
    default:
      return state;
  }
};

export default eventReducer;
