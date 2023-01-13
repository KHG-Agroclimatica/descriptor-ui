import { Fragment } from "react";
import Button from "devextreme-react/button";
import TagPanelFields from "./components/TabPanelFields";
import useFormItem from "./hooks/useFormItem";
import { useParams } from "react-router-dom";
import FormItem from "./components/FormItem";

const RegisterItem = () => {
  const {
    formRef,
    onClickSave,
    updateSourceDataTable,
    descriptorId,
    itemData,
    setItemData
  } = useFormItem();
  const params = useParams();

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
      <FormItem formRef={formRef} itemData={itemData} setItemData={setItemData}/>

      <TagPanelFields
        datasourceItems={itemData}
        descriptorId={descriptorId}
        updateSourceDataTable={updateSourceDataTable}
      />
    </Fragment>
  );
};

export default RegisterItem;
