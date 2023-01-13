import DataGrid, {
  Column,
  Editing,
  FormItem,
  Lookup,
  RequiredRule,
  Scrolling,
} from "devextreme-react/data-grid";
import TagBoxDatagrid, {
  cellTemplate,
} from "../../../components/ColumnTagDatagrid";
import NotifyWarning from "../../../components/NotifyWarning";
import { countries, languages } from "../../../utils/defaultData";
import { useDescriptorContext } from "../context/DescriptorContext";

const htmlEditorOptions = {
  height: 190,
  toolbar: {
    items: ["bold", "italic", "underline"],
  },
};

const RichTextFieldColumn = ({ id, onChangeTable, itemSource, titleForm }: any) => {
  const { countryIds } = useDescriptorContext();

  let datasource = [];
  if (itemSource.length > 0) datasource = itemSource[0].value;

  const notifyErrorSaving = (message: string = 'Error when saving') => {
    NotifyWarning(message);
  }

  const onSavingValidation = (e: any) => {
    if (e.changes.length == 0 || e.changes[0].type == 'remove') {
      return;
    }

    const dataChanged = { ...e.changes[0]?.key, ...e.changes[0].data };
    const dataSourceDatagrid: Array<any> = e.component.getDataSource()?._items;
    const countryIds = dataChanged?.countryId;

    if (!countryIds || countryIds.length == 0) {
      notifyErrorSaving('Please select at least one country');
      e.cancel = true;
      return;
    }

    for (const country of countryIds) {
      const existCountryWithSameLanguage = dataSourceDatagrid
        .find(row =>
          row.countryId.includes(country) &&
          row.languageId == dataChanged.languageId
        );

      if (existCountryWithSameLanguage) {
        if (existCountryWithSameLanguage.__KEY__ == dataChanged?.__KEY__)
          continue;
        else {
          notifyErrorSaving(`Cannot duplicate language with one the selected country`);
          e.cancel = true;
          break;
          return;
        }
      }
    }
    // }
  }

  return (
    <DataGrid
      dataSource={datasource}
      id={id}
      onSaved={onChangeTable}
      showBorders={true}
      onSaving={onSavingValidation}
    >
      <Scrolling mode="virtual" />
      <Editing allowAdding allowDeleting allowUpdating mode="popup" popup={{
        title: titleForm,
        showTitle: true,
        height: 'auto',
      }}/>
      <Column dataField="value">
        <RequiredRule />
        <FormItem
          colSpan={2}
          editorType="dxHtmlEditor"
          editorOptions={htmlEditorOptions}
        />
      </Column>
      <Column dataField="languageId" caption="Language">
        <RequiredRule message='Language required' />
        <Lookup dataSource={languages} displayExpr="name" valueExpr="id" />
      </Column>
      <Column
        dataField="countryId"
        caption="Country"
        editCellComponent={TagBoxDatagrid}
        cellTemplate={cellTemplate}
      >
        <RequiredRule />
        <Lookup
          dataSource={countries
            .filter((i) => countryIds.includes(i._id.toString()))
            .map((i) => ({ _id: i._id.toString(), name: i.name }))}
          valueExpr="_id"
          displayExpr="name"
        />
      </Column>
    </DataGrid>
  );
};

export default RichTextFieldColumn;