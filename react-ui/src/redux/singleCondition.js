import axios from 'axios';
import {updateAllConditions} from './conditions';
const initialState = {};

const GET_SINGLE_CONDITION = 'GET_SINGLE_CONDITION'
const UPDATE_CONDITION = 'UPDATE_CONDITION'

const getSingleCondition = condition => {
  return {
    type: GET_SINGLE_CONDITION,
    condition
  }
}
const updateCondition = condition => {
  return {
    type: UPDATE_CONDITION,
    name: condition.name,
    diagnosed: condition.diagnosed,
    typeOfPain: condition.typeOfPain
  }
}
export const getSingleConditionThunk = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/conditions/${id}`);
      dispatch(getSingleCondition(data));
    } catch (error) {
      console.log(error)
    }
  }
}
export const updateSingleConditionThunk = (
  id,
  name,
  diagnosed,
  typeOfPain
) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/conditions/${id}`,
        name,
        diagnosed,
        typeOfPain
      );
      dispatch(updateCondition(data));
      dispatch(updateAllConditions(data.id, data));
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_CONDITION:
      return action.condition
    case UPDATE_CONDITION:
      let updated = { ...state.condition }
      updated.firstName = action.condition.firstName
      updated.lastName = action.condition.lastName
      updated.address = action.condition.address
      updated.conditionType = action.condition.conditionType
      return updated
    default:
      return state
  }
}
