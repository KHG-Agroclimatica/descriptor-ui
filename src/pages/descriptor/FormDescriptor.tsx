import Button from "devextreme-react/button";
import Form, { Item, Label, SimpleItem } from "devextreme-react/form";
import { Fragment, useState } from "react";
import { countries } from "../../utils/defaultData";
import useFormDescriptor from "./hooks/useFormDescriptor";

const FormDescriptor = () => {
  const {
    relationshipData,
    classificationData,
    params,
    fieldFiltered,
    formData,
    formRef,
    filterFields,
    onClickSave,
  } = useFormDescriptor();

  const tagBoxSelection = {
    dataSource: fieldFiltered,
    searchEnabled: true,
    showSelectionControls: true,
    applyValueMode: "useButtons",
    valueExpr: "_id",
    displayExpr: "name",
  };

  const countryTagBoxSelection = {
    dataSource: countries,
    searchEnabled: true,
    showSelectionControls: true,
    applyValueMode: "useButtons",
    valueExpr: "_id",
    displayExpr: "name",
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h4 className="fw-normal">
          {params?.id ? "Edit descriptor" : "New descriptor"}
        </h4>

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
      <Form colCount={2} formData={formData} ref={formRef}>
        <SimpleItem dataField="name" isRequired={true} colSpan={1} />

        <Item
          dataField="countryIds"
          isRequired
          editorType="dxTagBox"
          editorOptions={countryTagBoxSelection}
        >
          <Label>CountryIds</Label>
        </Item>
        <Item
          dataField="classificationId"
          colSpan={1}
          editorType="dxSelectBox"
          editorOptions={{
            items: classificationData,
            displayExpr: "name",
            valueExpr: "_id",
            onValueChanged: filterFields,
          }}
          isRequired
        >
          <Label>Classification</Label>
        </Item>
        <Item
          dataField="fieldIds"
          colSpan={1}
          isRequired
          editorType="dxTagBox"
          editorOptions={tagBoxSelection}
        >
          <Label>Fields</Label>
        </Item>
        <Item
          dataField="description"
          colSpan={2}
          editorType="dxTextArea"
          editorOptions={{ height: 90, maxLength: 200 }}
          isRequired
        >
          <Label text="Description" />
        </Item>
        <Item
          dataField="relationshipId"
          colSpan={1}
          editorType="dxSelectBox"
          editorOptions={{
            items: relationshipData,
            displayExpr: "name",
            valueExpr: "_id",
            reset: true,
          }}
          isRequired
        >
          <Label>Relationship with:</Label>
        </Item>
      </Form>
    </Fragment>
  );
};

export default FormDescriptor;
