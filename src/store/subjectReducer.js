import { ADD_SUBJECT, CHANGE_SUBJECT, DELETE_SUBJECT } from "./subjectActions";

const initailState = [];
let id = 0

const subjectReduser = (state = initailState, action) => {
  switch (action.type) {
    case ADD_SUBJECT: {
      const newSubject = {
        id: ++id,
        name: action.payload
      }
      return [...state, newSubject];
    }
    case DELETE_SUBJECT: {
      return state.filter(subject=> subject.id != action.payload.id)
    }
    case CHANGE_SUBJECT: {
      return state.map(subject => subject.id == action.payload.id 
        ? subject.name = action.payload.name : subject);
    }
    default:
      return state;
  }
};
export default subjectReduser;