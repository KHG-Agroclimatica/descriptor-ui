import { sendRequest } from "../../../utils/request";
import ActionsController from "../../../hooks/actionDatagrid";

export default class ActionsDescriptor extends ActionsController {
    constructor(){
        super("http://localhost:3000/descriptor");
    }

    loadFields = async () => {
        const response = await sendRequest(`${this.URL.replace('/descriptor', '')}/field`);
        return response;
    }
}
