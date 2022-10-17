//TODO: string for types
const LOAD = "groups/loadGroups";
const LOAD_SINGLE = "groups/loadSingleGroup";
const ADD_SINGLE = "groups/addSingleGroup";

//TODO: action creator
export const loadGroups = (data) => {
  return {
    type: LOAD,
    groups: data,
  };
};

export const loadSingleGroup = (data) => {
  return {
    type: LOAD_SINGLE,
    group: data,
  };
};

export const addGroup = (data) => {
  return {
    type: ADD_SINGLE,
    data: data,
  };
};

//TODO: thunk action creator
export const fetchGroups = () => async (dispatch) => {
  const response = await fetch("/api/groups");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadGroups(data));
  }
  return response;
};

export const fetchSingleGroup = (id) => async (dispatch) => {
  const response = await fetch(`/api/groups/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSingleGroup(data));
  }
  return response;
};

export const createSingleGroup = (groupDataObj) => async (dispatch) => {
  const response = await fetch("/api/groups", {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(groupDataObj),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addGroup(data));
  }
};

//TODO: reducer

const initialState = {};

const groupReducer = (state = initialState, action) => {
  let groupStateObj;
  switch (action.type) {
    case LOAD:
      groupStateObj = { ...state };
      groupStateObj.allGroups = {};
      // action.groups.Groups.forEach((group) => {
      //   groupStateObj.allGroups[group.id] = group;
      // });
      groupStateObj.allGroups = action.groups.Groups;
      return groupStateObj;
    case LOAD_SINGLE:
      groupStateObj = { ...state };
      groupStateObj.singleGroup = action.group;
      return groupStateObj;
    case ADD_SINGLE:
      groupStateObj = { ...state };
      groupStateObj.singleGroup = action.data;
      return groupStateObj;
    default:
      return state;
  }
};

export default groupReducer;
