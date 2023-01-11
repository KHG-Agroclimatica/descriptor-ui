import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDatagridCrud from "../../../hooks/useDatagridCrud";
import ActionsDescriptor from "../utils/actionsDescriptor";

const actions = new ActionsDescriptor();

const useDataGridDescriptor = () => {
  const {
    state,
    onChangesChange,
    onEditRowKeyChange,
    onSaving,
    dispatch,
    tableRef,
    dataGridInstance,
  } = useDatagridCrud({ actions });
  const [classificationData, setClassificationData] = useState([]);
  const [fieldsData, setFieldsData] = useState([]);
  const [classificationFields, setClassificationFields] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    actions.loadFields().then((resp: any) => {
      setFieldsData(resp.fields);
      setClassificationData(resp.classifications);
      actions.loadOrders(dispatch);
    });
  }, []);

  const validationFields = useCallback((params: any) => {
    if (params.value && params.value.length > 0) return true;

    return false;
  }, []);

  const onClickLink = useCallback((route: string) => {
    const selectedRows = dataGridInstance().getSelectedRowsData();

    if (selectedRows.length == 0) return;

    if (route == "/screens") route = selectedRows[0]._id + route;

    navigate(route, {
      state: { id: selectedRows[0]._id, name: selectedRows[0].name },
    });
  }, []);

  return {
    onClickLink,
    validationFields,
    fieldsData,
    state,
    onSaving,
    tableRef,
    onChangesChange,
    onEditRowKeyChange,
    classificationData,
    classificationFields
  };
};

export default useDataGridDescriptor;
