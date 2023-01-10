import {
  Column,
  DataGrid,
  Editing,
  RequiredRule,
} from "devextreme-react/data-grid";
import useDatagridCrud from "../../hooks/useDatagridCrud";
import MainSectionLayout from "../../layouts/MainSectionLayout";
import { useEffect } from "react";
import ActionsClassification from "./utils/actionsClassification";

const actions = new ActionsClassification();

const List = () => {
  const { state, onChangesChange, onEditRowKeyChange, onSaving, dispatch } =
    useDatagridCrud({ actions });

  useEffect(() => {
    actions.loadClassification(dispatch);
  }, []);

  return (
    <MainSectionLayout title="Classification of the descriptor">
      <DataGrid
        id="gridContainer"
        keyExpr="_id"
        dataSource={state?.data ?? []}
        showBorders
        repaintChangesOnly
        onSaving={onSaving}
      >
        <Editing
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
          changes={state.changes}
          onChangesChange={onChangesChange}
          editRowKey={state.editRowKey}
          onEditRowKeyChange={onEditRowKeyChange}
        />
        <Column dataField="_id" caption="id" allowEditing={false} />
        <Column dataField="name">
          <RequiredRule />
        </Column>
        <Column dataField="description">
          <RequiredRule />
        </Column>
      </DataGrid>
    </MainSectionLayout>
  );
};

export default List;
