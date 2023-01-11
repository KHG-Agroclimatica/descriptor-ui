import Form, { Item, Label, RequiredRule } from "devextreme-react/form";
import { Fragment } from "react";
import Button from "devextreme-react/button";
import TagPanelFields from "./components/TabPanelFields";
import useFormItem from "./hooks/useFormItem";
import { countries } from "../../utils/defaultData";
import { useParams } from "react-router-dom";
import { useDescriptorContext } from "./context/DescriptorContext";

const RegisterItem = () => {
  const {
    formRef,
    onClickSave,
    updateSourceDataTable,
    descriptorId,
    itemData,
  } = useFormItem();
  const { countryIds } = useDescriptorContext();
  const params = useParams();

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

  return (
    <Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h4 className="fw-normal">{params?.id ? "Edit item" : "New Item"}</h4>

        <Button
          width={120}
          text="Save"
          type="success"
          icon="save"
          stylingMode="contained"
          onClick={onClickSave}
          useSubmitBehavior={true}
        />
      </div>

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
      </Form>

      <TagPanelFields
        datasourceItems={itemData}
        descriptorId={descriptorId}
        updateSourceDataTable={updateSourceDataTable}
      />
    </Fragment>
  );
};

export default RegisterItem;
