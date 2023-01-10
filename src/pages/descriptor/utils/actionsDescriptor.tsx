import { sendRequest } from "../../../utils/request";
import ActionsController from "../../../hooks/actionDatagrid";

export default class ActionsDescriptor extends ActionsController {
    loadFields = async () => {
        const response = await sendRequest(`${this.URL.replace('/descriptor', '')}/field`);
        return response;
    }
}
