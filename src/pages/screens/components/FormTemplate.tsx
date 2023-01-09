import { RequiredRule } from "devextreme-react/data-grid";
import { GroupItem, Form, SimpleItem, Item } from "devextreme-react/form";
import ListFields from "./ListFields";

const FormTemplate = () => {
  return (
    <>
      <Form id="form">
        <GroupItem colCount={2}>
          <SimpleItem dataField="name" colSpan={2}>
            <RequiredRule message='Name is required'/>
          </SimpleItem>
          <Item
            dataField="description"
            editorType="dxTextArea"
            colSpan={2}
          ></Item>
        </GroupItem>
      </Form>
      <ListFields />
    </>
  );
};

export default FormTemplate;
