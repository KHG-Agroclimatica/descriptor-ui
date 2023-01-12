import { sendRequest } from "../../../utils/request";
import ActionsController from "../../../hooks/actionDatagrid";
import { ConfigEnv } from "../../../utils/configEnv";

export default class ActionsDescriptor extends ActionsController {
  constructor() {
    super(ConfigEnv.DESCRIPTOR_API_URL+"/descriptor");
  }

  filterById = async (id: String) => {
    return await sendRequest(`${this.URL}/${id}`);
  }

  loadFields = async () => {
    let fields: any[] = [];
    let classifications: any[] = [];
    let relationships: any[] = [];

    const callApi1 = async () => {
      fields = await sendRequest(
        `${this.URL.replace("/descriptor", "")}/field`
      );
    };

    const callApi2 = async () => {
      classifications = await sendRequest(
        `${this.URL.replace("/descriptor", "")}/classification`
      );
    };

    const callApi3 = async () => {
      relationships = await sendRequest(
        `${this.URL.replace("/descriptor", "")}/relationship`
      );
    };

    await Promise.all([callApi1, callApi2, callApi3].map((fc) => fc()));

    return {
      fields,
      classifications,
      relationships
    };
  };
}
