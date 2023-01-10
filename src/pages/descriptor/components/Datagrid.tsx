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
import { Fragment } from "react";
import useDatagridCrud from "../../../hooks/useDatagridCrud";
import ActionsDescriptor from "../utils/actionsDescriptor";
import TagBoxDatagrid from "../../../components/ColumnTagDatagrid";
import { cellTemplate } from "../../../components/ColumnTagDatagrid";
import { countries } from "../../../utils/defaultData";
import useDataGridDescriptor from "../hooks/useDataGridDescriptor";

const actions = new ActionsDescriptor();
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
  const { fieldsData, onClickLink, validationFields } = useDataGridDescriptor({
    actions,
    dispatch,
    dataGridInstance,
  });

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
