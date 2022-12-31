import { csrfFetch } from "./csrf";

//TODO: string for types
const LOAD = "groups/loadGroups";
const LOAD_SINGLE = "groups/loadSingleGroup";
const ADD_SINGLE = "groups/addSingleGroup";
const ADD_IMAGE = "groups/addImageToGroup";
const GET_LAST_GROUP = "groups/getLastGroup";
const EDIT_GROUP = "groups/editGroup";
const DELETE_GROUP = "groups/deleteGroup";
const GET_MEMBERS = "groups/getMembers";

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
    data: data, // response data from fetch edit
  };
};

export const addImage = (data, groupId) => {
  return {
    type: ADD_IMAGE,
    image: data,
    id: groupId,
  };
};

export const editGroup = (data) => {
  return {
    type: EDIT_GROUP,
    data: data,
  };
};

export const deleteGroupCreator = (groupId) => {
  return {
    type: DELETE_GROUP,
    id: groupId,
  };
};

export const getMembers = (memberData) => {
  return {
    type: GET_MEMBERS,
    members: memberData,
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
    console.log(data);
    dispatch(loadSingleGroup(data));
  }
  return response;
};

export const createSingleGroup = (groupDataObj) => async (dispatch) => {
  const response = await csrfFetch("/api/groups", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(groupDataObj),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addGroup(data));
    return data;
  }
  // return response;
};

export const addImageToGroup = (groupId, imgUrl) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: imgUrl, preview: true }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addImage(data, groupId));
  }
  return response;
};

export const fetchEditGroup = (groupId, formData) => async (dispatch) => {
  // Fetching this response with input data will update database backend
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    dispatch(editGroup(data));
    return data;
  }
};

export const deleteGroup = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteGroupCreator(groupId));
    return data;
  }
};

export const fetchMembers = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/members`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getMembers(data));
    return data;
  } else {
    return response;
  }
};

//TODO: reducer

const initialState = {};

const groupReducer = (state = initialState, action) => {
  let groupStateObj = {};
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
    case ADD_IMAGE:
      groupStateObj = { ...state };
      // console.log(action.image);
      // console.log(groupStateObj);
      return groupStateObj;
    case GET_LAST_GROUP:
      groupStateObj = { ...state };
      groupStateObj.lastGroup =
        groupStateObj.allGroups[groupStateObj.allGroups.length - 1];
    case EDIT_GROUP:
      groupStateObj = { ...state };
      groupStateObj.singleGroup = action.data;
      console.log(EDIT_GROUP);
      return groupStateObj;
    case DELETE_GROUP:
      groupStateObj = { ...state };
      delete groupStateObj.singleGroup;
      groupStateObj.allGroups = groupStateObj.allGroups.filter(
        (group) => group.id !== action.id
      );
      return groupStateObj;
    case GET_MEMBERS:
      groupStateObj = { ...state };
      groupStateObj.members = action.members;
      return groupStateObj;
    default:
      return state;
  }
};

export default groupReducer;
