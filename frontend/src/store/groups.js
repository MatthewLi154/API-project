//TODO: string for types
const LOAD = "groups/loadGroups";
const LOAD_SINGLE = "groups/loadSingleGroup";

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
    singleGroup: data,
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
      groupStateObj.singleGroup = action.singleGroup;
      return groupStateObj;
    default:
      return state;
  }
};

export default groupReducer;
