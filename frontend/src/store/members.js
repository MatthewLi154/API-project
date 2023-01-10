import { csrfFetch } from "./csrf";

// TODO: string for types
const LOAD_MEMBERS = "members/loadMembers";

// TODO: action creators
export const loadMembers = (data) => {
  return {
    type: LOAD_MEMBERS,
    members: data,
  };
};

// TODO: thunk actoin creator
export const fetchMembers = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/members`);

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    dispatch(loadMembers(data));
    return data;
  }
};

// TODO: reducer

const initialState = { groupMembers: {} };

const membersReducer = (state = initialState, action) => {
  let membersStateObj = { ...state };
  switch (action.type) {
    case LOAD_MEMBERS:
      console.log(action.members);
      membersStateObj.groupMembers = action.members.Members;
      return membersStateObj;
    default:
      return membersStateObj;
  }
};

export default membersReducer;
