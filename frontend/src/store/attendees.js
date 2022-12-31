import { csrfFetch } from "./csrf";

// TODO: string for types
const LOAD_ATTENDEES = "attendees/loadAttendees";

// TODO: action creators
export const loadAttendees = (data) => {
  return {
    type: LOAD_ATTENDEES,
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

// TODO: reducer

const initialState = {};

const attendeeReducer = (state = initialState, action) => {
  let attendeeStateObj = {};
  switch (action.type) {
    case LOAD_ATTENDEES:
      //   let normAttendees = {};
      //   for (const attendee of attendees) {
      //     normAttendees.attendee = attendees[attendee];
      //   }
      attendeeStateObj = { ...state };
      attendeeStateObj = action.attendees;
      return attendeeStateObj;
    default:
      return attendeeStateObj;
  }
};

export default attendeeReducer;
