import Form, { Item, Label, RequiredRule } from "devextreme-react/form";
import { useDescriptorContext } from "../context/DescriptorContext";
import DropDownBox from "devextreme-react/drop-down-box";
import DataGrid, {
  FilterRow,
  Paging,
  Scrolling,
  Selection,
} from "devextreme-react/data-grid";
import { countries } from "../../../utils/defaultData";
import { useEffect, useState } from "react";
import { sendRequest } from "../../../utils/request";
import ActionsItem from "../utils/ActionsItem";

const providerActions = new ActionsItem();

const FormItem = ({ formRef, itemData, setItemData }: any) => {
  const { countryIds, id: descriptorId } = useDescriptorContext();
  const [gridDataSource, setGridDataSource] = useState<Array<any>>([]);
  const [gridBoxValue, setGridBoxValue] = useState<Array<any>>([]);
  const [hasRelationship, setHasRelationship] = useState(false);
  const [relationshipApi, setRelationshipApi] = useState({
    api: {
      parameterName: "",
      parameterId: "",
    },
    name: "",
    id: "",
  });

  useEffect(() => {
    setGridBoxValue(itemData?.referencesIds);
  }, [itemData])
  

  useEffect(() => {
    providerActions.fetchResource({keyAction: 'GET_RELATIONSHIP', id: descriptorId}).then((relationshipResp) => {
      if (!relationshipResp) return;

      if (relationshipResp?.api?.uri) {
        sendRequest(relationshipResp.api.uri).then((apiResp) => {
          setRelationshipApi(relationshipResp);
          setGridDataSource(apiResp.data);
          setHasRelationship(true);
        });
      }
    });
  }, []);

  const tagBoxSelection = {
    items: countries
      .filter((i) => countryIds.includes(i._id.toString()))
      .map((i) => ({ _id: i._id.toString(), name: i.name })),
    searchEnabled: true,
    value: itemData.countryIds,
    showSelectionControls: true,
    applyValueMode: "useButtons",
    valueExpr: "_id",
    displayExpr: "name",
  };

  const dataGridRender = () => {
    return (
      <DataGrid
        height={345}
        dataSource={gridDataSource}
        keyExpr={relationshipApi.api.parameterId}
        hoverStateEnabled={true}
        selectedRowKeys={gridBoxValue}
        onSelectionChanged={dataGridOnSelectionChanged}
      >
        <Selection mode="multiple" />
        <Scrolling mode="virtual" />
        <Paging enabled={true} pageSize={10} />
        <FilterRow visible={true} />
      </DataGrid>
    );
  };

  const dataGridOnSelectionChanged = (e: any) => {
    setGridBoxValue(e.selectedRowKeys);
    setItemData({
      ...itemData,
      referencesIds: e.selectedRowKeys,
    });
  };

  return (
    <Form ref={formRef} showValidationSummary={true} formData={itemData}>
      <Item dataField="name" caption="Identification name">
        <RequiredRule message="Name is required" />
      </Item>
      <Item
        dataField="countryIds"
        editorType="dxTagBox"
        editorOptions={tagBoxSelection}
      >
        <Label text="Country" />
        <RequiredRule message="Country is required" />
      </Item>

      {hasRelationship && (
        <Item
          dataField="referencesIds"
          render={() => (
            <DropDownBox
              value={gridBoxValue}
              valueExpr="cropId"
              deferRendering={false}
              displayExpr="cropName"
              placeholder="Select a value..."
              showClearButton={true}
              dataSource={gridDataSource}
              contentRender={dataGridRender}
            />
          )}
          isRequired
        >
          <Label>Reference to:</Label>
          <RequiredRule message="References is required" />
        </Item>
      )}
    </Form>
  );
};

export default FormItem;
