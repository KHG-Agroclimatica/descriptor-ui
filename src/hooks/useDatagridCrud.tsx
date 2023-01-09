import React, { useCallback, useRef } from "react";
import reducer from "../pages/field/hooks/fieldReducer";

const initialState = {
  data: [],
  changes: [],
  editRowKey: null,
  isLoading: false,
};

const useDatagridCrud = ({ actions }: any) => {
  const tableRef = useRef<any>(null);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onSaving = useCallback((e: any) => {
    e.cancel = true;
    e.promise = actions.saveChange(dispatch, e.changes[0]);
  }, []);

  const onChangesChange = useCallback((changes: any) => {
    actions.setChanges(dispatch, changes);
  }, []);

  const onEditRowKeyChange = useCallback((editRowKey: any) => {
    actions.setEditRowKey(dispatch, editRowKey);
  }, []);

  const dataGridInstance = () => {
    return tableRef?.current?.instance;
  }

  return {
    tableRef,
    state,
    onSaving,
    onChangesChange,
    onEditRowKeyChange,
    dispatch,
    dataGridInstance
  };
};

export default useDatagridCrud;
