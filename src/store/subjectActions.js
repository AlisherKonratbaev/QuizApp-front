export const ADD_SUBJECT = "ADD_SUBJECT";
export const DELETE_SUBJECT = "DELETE_SUBJECT";
export const CHANGE_SUBJECT = "CHANGE_SUBJECT";

export const addSubjectAction = (payload) => ({ type: ADD_SUBJECT, payload });
export const deleteSubjectAction = (payload) => ({
  type: DELETE_SUBJECT,
  payload,
});
export const changeSubjectAction = (payload) => ({
  type: CHANGE_SUBJECT,
  payload,
});
