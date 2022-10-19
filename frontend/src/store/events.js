import { csrfFetch } from "./csrf";

// TODO: string for types
const LOAD_ALL_EVENTS = "events/loadAllEvents";

// TODO: action creators
export const loadAllEvents = (data) => {
  return {
    type: LOAD_ALL_EVENTS,
    events: data,
  };
};

// TODO: thunk action creator

export const fetchAllEvents = () => async (dispatch) => {
  const response = await fetch("/api/events");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadAllEvents(data));
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
    default:
      return state;
  }
};

export default eventReducer;
