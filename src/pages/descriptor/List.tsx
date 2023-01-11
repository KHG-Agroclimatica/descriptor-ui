import { Button as ButtonToolbar } from "devextreme-react/button";
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
  Button,
} from "devextreme-react/data-grid";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import TagBoxDatagrid from "../../components/ColumnTagDatagrid";
import { cellTemplate } from "../../components/ColumnTagDatagrid";
import { countries } from "../../utils/defaultData";
import useDataGridDescriptor from "./hooks/useDataGridDescriptor";

const Datagrid = () => {
  const {
    fieldsData,
    onClickLink,
    validationFields,
    state,
    onSaving,
    tableRef,
    onChangesChange,
    onEditRowKeyChange,
    classificationData,
  } = useDataGridDescriptor();

  const navigate = useNavigate();

  const onClickNavigate = (e: any, actionType: String) => {

    switch (actionType) {
      case "NEW":
        navigate("./new");
        break;
      case "EDIT":
        navigate("./" + e.row.key);
        break;
      case "ITEMS":
        navigate("/descriptorItems", {
          state: { id: e.row.key, name: e.row.data.name },
        });
        break;
      default:
        break;
    }

    // navigate("./new");
  };

  return (
    <Fragment>
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
            <ButtonToolbar
              icon="plus"
              onClick={(e: any) => onClickNavigate(e, "NEW")}
              type="success"
              text="New"
            />
          </Item>
        </Toolbar>
        <Editing
          // mode="popup"
          allowUpdating={true}
          allowDeleting={true}
          changes={state.changes}
          onChangesChange={onChangesChange}
          popup={{ showTitle: true, title: "Descriptor form" }}
        />
        <Column dataField="_id" caption="Id" allowEditing={false}></Column>
        <Column dataField="name">
          <RequiredRule />
        </Column>
        <Column dataField="description">
          <RequiredRule />
        </Column>

        <Column dataField="classificationId" caption="Classification">
          <RequiredRule />
          <Lookup
            dataSource={classificationData}
            valueExpr="_id"
            displayExpr="name"
          />
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
        <Column type="buttons">
          <Button
            text="Items"
            onClick={(e: any) => onClickNavigate(e, "ITEMS")}
          />
          <Button
            name="edit"
            icon="edit"
            onClick={(e: any) => onClickNavigate(e, "EDIT")}
          />
          <Button name="delete" icon="trash" />
        </Column>
      </DataGrid>
    </Fragment>
  );
};

export default Datagrid;
