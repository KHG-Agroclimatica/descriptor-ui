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

  fetchResource = ({ keyAction, data, id }: any) => {
    let uri = this.URL + "/";

    switch (keyAction) {
      case "CREATE":
        return sendRequest(`${uri}/create`, "POST", data);

      case "UPDATE":
        return sendRequest(`${uri}/${id}`, "PUT", data);

      case "GET_BY_ID":
        uri = uri.concat('/'+id);
        break;

      case "GET_RELATIONSHIP":
        uri = uri.replace('/descriptor_items', '/descriptor');
        uri = uri.concat(`${id}/relationship`);
        break;

      default:
        break;
    }

    console.log(uri);
    return sendRequest(uri);
  };
}
