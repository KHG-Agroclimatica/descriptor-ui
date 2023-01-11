import { List } from "devextreme-react";
import Button from "devextreme-react/button";
import DropDownBox from "devextreme-react/drop-down-box";
import Form, { Item, Label, SimpleItem } from "devextreme-react/form";
import { Fragment, useRef, useState } from "react";
import { countries } from "../../utils/defaultData";
import useFormDescriptor from "./hooks/useFormDescriptor";

const FormDescriptor = () => {
  const {
    classificationData,
    params,
    fieldFiltered,
    filterFields,
    itemFieldRef,
  } = useFormDescriptor();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    countryIds: [],
    classificationId: [],
    fieldIds: [],
  });

  const onClickSave = (e: any) => {
    console.log(e);
  };

  const onClassificationChange = (e: any) => {
    filterFields(e?.value);
  };

  console.log("hello", fieldFiltered);

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
      <Form colCount={2} formData={formData} >
        <SimpleItem dataField="name" isRequired={true} colSpan={1} />

        <Item
          dataField="countryIds"
          isRequired
          editorType="dxSelectBox"
          editorOptions={{
            valueExpr: "_id",
            displayExpr: "name",
            dataSource: countries,
          }}
        >
          <Label>CountryIds</Label>
        </Item>
        <Item
          colSpan={1}
          dataField="classificationId"
          editorType="dxSelectBox"
          editorOptions={{
            items: classificationData,
            displayExpr: "name",
            valueExpr: "_id",
            onValueChanged: onClassificationChange,
          }}
          isRequired
        >
          <Label>Classification</Label>
        </Item>
        <Item
          ref={itemFieldRef}
          colSpan={1}
          isRequired
          editorType="dxDropDownBox"
          dataField="fieldIds"
          // template={}
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
      </Form>
    </Fragment>
  );
};

export default FormDescriptor;
