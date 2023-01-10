import { sendRequest } from "../../../utils/request";
import actions, {
  FETCH_ERROR,
  FETCH_PENDING,
  FETCH_SUCCESS,
} from "../../../hooks/actionDatagrid";

export default class ActionsItem extends actions {
  constructor() {
    super("http://localhost:3000/descriptor_items");
  }

  loadItemsByDescriptor = async ( descriptorId: string, dispatch: any) => {
    dispatch({ type: FETCH_PENDING });

    try {
      const data = await sendRequest(`${this.URL}/descriptor/${descriptorId}`);
      
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
  };
}
