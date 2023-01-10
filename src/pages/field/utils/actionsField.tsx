import React, { Component } from "react";
import actions from "../../../hooks/actionDatagrid";
import { sendRequest } from "../../../utils/request";

export default class ActionsField extends actions {
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
