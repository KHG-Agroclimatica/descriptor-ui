import actions from "../../../hooks/actionDatagrid";
import { ConfigEnv } from "../../../utils/configEnv";
import { sendRequest } from "../../../utils/request";

export default class ActionsField extends actions {
  constructor(){
    super(ConfigEnv.DESCRIPTOR_API_URL+"/field");
  }

  fetchTypeField = async () => {
    const response = await sendRequest(
      `${this.URL.replace("/field", "")}/typeField`
    );
    return response;
  };

  fetchClassification = async () => {
    const response = await sendRequest(`${this.URL.replace('/field', '')}/classification`);
    return response;
  }
}
