import actions, { FETCH_ERROR, FETCH_PENDING, FETCH_SUCCESS } from '../../../hooks/actionDatagrid'
import { sendRequest } from '../../../utils/request';

export default class ActionsClassification extends actions {
  constructor() {
    super('http://localhost:3000/classification')
  }

  async loadClassification(dispatch: any) {
    dispatch({ type: FETCH_PENDING });

    try {
      const data = await sendRequest(`${this.URL}/`);
      
      dispatch({
        type: FETCH_SUCCESS,
        payload: {
          data,
        },
      });
    } catch (err) {
      dispatch({ type: FETCH_ERROR });
      throw err;
    }
  }
}
