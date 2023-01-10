import DataGrid, {
  Editing,
  Column,
  Lookup,
  Scrolling,
  RequiredRule,
} from "devextreme-react/data-grid";
import LoadPanel from "devextreme-react/load-panel";
import React, { Fragment, useState } from "react";
import TagBoxDatagrid, { cellTemplate } from "../../../components/ColumnTagDatagrid";
import useDatagridCrud from "../../../hooks/useDatagridCrud";
import ActionsField from "../utils/actionsField";

const actions = new ActionsField("http://localhost:3000/field");
const loadPanelPosition = { of: "#gridContainer" };

let temp: any = null;
const Datagrid = () => {
  const { state, onChangesChange, onEditRowKeyChange, onSaving, dispatch } =
    useDatagridCrud({ actions });
  const [lookupData, setLookupData] = useState([]);
  const [classificationData, setClassificationData] = useState([]);

  React.useEffect(() => {
    actions.loadOrders(dispatch);
    actions.fetchTypeField().then((resp) => {
      setLookupData(resp);
    });
    actions.fetchClassification().then((resp) => {
      setClassificationData(resp);
    });
  }, []);

  const onInitialized = (el: any) => {
    temp = el.component;
  };

  return (
    <Fragment>
      <LoadPanel position={loadPanelPosition} visible={state.isLoading} />
      <DataGrid
        id="gridContainer"
        keyExpr="_id"
        dataSource={state?.data ?? []}
        showBorders
        repaintChangesOnly
        onSaving={onSaving}
        onInitialized={onInitialized}
      >
        <Scrolling mode="virtual" />
        <Editing
          mode="row"
          allowAdding
          allowDeleting
          allowUpdating
          changes={state.changes}
          onChangesChange={onChangesChange}
          editRowKey={state.editRowKey}
          onEditRowKeyChange={onEditRowKeyChange}
        />
        <Column dataField="_id" caption="Id" allowEditing={false}></Column>
        <Column dataField="name">
          <RequiredRule />
        </Column>
        <Column dataField="description" />
        <Column dataField="typeField">
          <RequiredRule />
          <Lookup
            dataSource={lookupData}
            displayExpr="name"
            valueExpr="reference"
          />
        </Column>

        <Column
          dataField="classificationId"
          caption="Classification"
          editCellComponent={TagBoxDatagrid}
          cellTemplate={cellTemplate}
        >
          <RequiredRule/>
          <Lookup
            dataSource={classificationData}
            valueExpr="_id"
            displayExpr="name"
          />
        </Column>

      </DataGrid>
    </Fragment>
  );
};

export default Datagrid;
