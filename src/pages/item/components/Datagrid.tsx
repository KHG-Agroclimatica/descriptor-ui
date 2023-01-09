import { Button as ButtonToolbar } from "devextreme-react/button";
import DataGrid, {
  Editing,
  Column,
  Toolbar,
  Item,
  Button,
  Lookup,
  SearchPanel,
  HeaderFilter,
} from "devextreme-react/data-grid";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TagBoxDatagrid, { cellTemplate } from "../../../components/ColumnTagDatagrid";
import useDatagridCrud from "../../../hooks/useDatagridCrud";
import { countries } from "../../../utils/defaultData";
import ActionsItem from "../utils/ActionsItem";

const actions = new ActionsItem();

const Datagrid = ({ descriptorId }: any) => {
  const { state, onChangesChange, onEditRowKeyChange, onSaving, dispatch } =
    useDatagridCrud({ actions });
  const navigate = useNavigate();

  useEffect(() => {
    if (descriptorId) actions.loadItemsByDescriptor(descriptorId, dispatch);
  }, [descriptorId]);

  const onClickEdit = (e: any) => {
    navigate("./" + e.row.key);
  };

  const onClickAdd = (e: any) => {
    navigate("./new");
  };


  function calculateFilterExpressionCountry(filterValue: any, selectedFilterOperation: any, target: any) {
    return function (data: any) {
      return (data.countryIds || []).indexOf(filterValue) !== -1;
    };
  }
  
  return (
    <Fragment>
      <DataGrid
        id="gridContainer"
        keyExpr="_id"
        dataSource={state?.data ?? []}
        repaintChangesOnly
        onSaving={onSaving}
      >
        <Editing
          mode="row"
          allowDeleting
          changes={state.changes}
          onChangesChange={onChangesChange}
          editRowKey={state.editRowKey}
          onEditRowKeyChange={onEditRowKeyChange}
        />
        <Toolbar>
          <Item location="before">
            <ButtonToolbar icon="plus" onClick={onClickAdd} />
          </Item>
          <Item name='searchPanel' />
        </Toolbar>
        <HeaderFilter visible={true} />
        <SearchPanel visible={true}
          placeholder="Search..." />

        <Column
          dataField="_id"
          caption="Id"
          allowEditing={false}
          width="auto"
        ></Column>
        <Column dataField="name" />
        <Column
          dataField="countryIds"
          editCellComponent={TagBoxDatagrid}
          cellTemplate={cellTemplate}
          allowSorting={false}
          calculateFilterExpression={calculateFilterExpressionCountry}
        >
          <Lookup
            dataSource={countries.map((i) => ({
              _id: i._id.toString(),
              name: i.name,
            }))}
            valueExpr="_id"
            displayExpr="name"
          />
        </Column>

        <Column type="buttons" width={110}>
          <Button icon="edit" onClick={onClickEdit}></Button>
          <Button name="delete" icon="trash" />
        </Column>
      </DataGrid>
    </Fragment>
  );
};

export default Datagrid;
