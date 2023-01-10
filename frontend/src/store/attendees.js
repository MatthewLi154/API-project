import { csrfFetch } from "./csrf";

// TODO: string for types
const LOAD_ATTENDEES = "attendees/loadAttendees";
const ADD_ATTENDEES = "attendees/addAttendees";

// TODO: action creators
export const loadAttendees = (data) => {
  return {
    type: LOAD_ATTENDEES,
    attendees: data,
  };
};

export const addAttendee = (data) => {
  return {
    type: ADD_ATTENDEES,
    attendees: data,
  };
};

// TODO: thunk action creator
export const fetchAttendees = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/attendees`);

  if (response.ok) {
    const data = await response.json();

    // normalize array
    let attendees = {};
    let attendeesArr = data.Attendees;

    for (const attendee of attendeesArr) {
      attendees[attendee.id] = attendee;
    }

    // console.log(attendees);
    dispatch(loadAttendees(attendees));
    return data;
  }
};

export const addNewAttendees = (eventId, userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/attendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  dispatch(fetchAttendees(eventId));
};

export const deleteAttendee = (eventId, userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/attendance`, {
    method: "DELETE",
    body: JSON.stringify({ memberId: userId }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(fetchAttendees(eventId));
    return data;
  }
};

// TODO: reducer

const initialState = { eventAttendees: {} };

const attendeeReducer = (state = initialState, action) => {
  let attendeeStateObj = { ...state };
  switch (action.type) {
    case LOAD_ATTENDEES:
      attendeeStateObj = { ...state };
      attendeeStateObj.eventAttendees = action.attendees;
      return attendeeStateObj;
    default:
      return attendeeStateObj;
  }
};

export default attendeeReducer;
