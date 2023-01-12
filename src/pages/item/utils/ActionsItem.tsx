import { sendRequest } from "../../../utils/request";
import actions, {
  FETCH_ERROR,
  FETCH_PENDING,
  FETCH_SUCCESS,
} from "../../../hooks/actionDatagrid";
import { ConfigEnv } from "../../../utils/configEnv";

export default class ActionsItem extends actions {
  constructor() {
    super(ConfigEnv.DESCRIPTOR_API_URL + "/descriptor_items");
  }

  loadItemsByDescriptor = async (descriptorId: string, dispatch: any) => {
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
