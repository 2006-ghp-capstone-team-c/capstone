import axios from 'axios';
const initialState = [];

const GET_CHART = 'GET_CHART';

const getChart = chart => {
  return {
    type: GET_CHART,
    chart
  }
}

export const getChartThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/score`)
      dispatch(getChart(data));
    } catch (error) {
      console.error(error)
    }
  }
}
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CHART:
      return action.chart
    default:
      return state
  }
}
