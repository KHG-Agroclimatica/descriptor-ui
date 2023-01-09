import { Button } from "devextreme-react/button";
import DataGrid, {
  Editing,
  Column,
  Scrolling,
  RequiredRule,
  Lookup,
  CustomRule,
  Toolbar,
  Item,
  Selection,
} from "devextreme-react/data-grid";
import LoadPanel from "devextreme-react/load-panel";
import React, { Fragment, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDatagridCrud from "../../../hooks/useDatagridCrud";
import ActionsDescriptor from "../utils/actionsDescriptor";
import TagBoxDatagrid from "../../../components/ColumnTagDatagrid";
import { cellTemplate } from "../../../components/ColumnTagDatagrid";
import { countries } from "../../../utils/defaultData";

const actions = new ActionsDescriptor("http://localhost:3000/descriptor");
const loadPanelPosition = { of: "#gridContainer" };

const Datagrid = () => {
  const {
    state,
    onChangesChange,
    onEditRowKeyChange,
    onSaving,
    dispatch,
    tableRef,
    dataGridInstance,
  } = useDatagridCrud({ actions });
  const [fieldsData, setFieldsData] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    actions.loadFields().then((resp) => {
      setFieldsData(resp);
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
        ref={tableRef}
      >
        <Selection mode="single" />
        <Scrolling mode="virtual" />
        <Toolbar>
          <Item location="before">
            <Button
              icon="check"
              type="success"
              text="Items"
              onClick={(e) => onClickLink("/descriptorItems")}
            />
          </Item>
          <Item name="addRowButton" />
        </Toolbar>
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
        <Column dataField="description">
          <RequiredRule />
        </Column>
        <Column
          dataField="fieldIds"
          caption="Fields"
          editCellComponent={TagBoxDatagrid}
          cellTemplate={cellTemplate}
        >
          <CustomRule
            message="Select at least one Field"
            validationCallback={validationFields}
          />
          <Lookup dataSource={fieldsData} valueExpr="_id" displayExpr="name" />
        </Column>
        <Column
          dataField="countryIds"
          caption="Countries"
          editCellComponent={TagBoxDatagrid}
          cellTemplate={cellTemplate}
        >
          <CustomRule
            message="Select at least one Country"
            validationCallback={validationFields}
          />
          <Lookup
            dataSource={countries.map((i) => ({
              _id: i._id.toString(),
              name: i.name,
            }))}
            valueExpr="_id"
            displayExpr="name"
          />
        </Column>
      </DataGrid>
    </Fragment>
  );
};

export default Datagrid;
