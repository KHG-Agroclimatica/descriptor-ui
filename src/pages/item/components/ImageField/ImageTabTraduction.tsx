import DataGrid, {
  Column,
  CustomRule,
  Editing,
  Lookup,
  RequiredRule,
} from "devextreme-react/data-grid";
import { languages } from "../../../../utils/defaultData";

const ImageTabTraduction = ({ nameTranslation }: any) => {


  const validationDuplicateLanguage = (e: any) => {
    return !nameTranslation.some((item: any) => item.language == e.value);
  }

  return (
    <>
      <DataGrid dataSource={nameTranslation}>
        <Editing allowAdding={true} allowDeleting={true} allowUpdating={true} />
        <Column dataField="name">
          <RequiredRule message="Name is required" />
        </Column>
        <Column dataField="language">
          <RequiredRule message="Language is required" />
          <CustomRule validationCallback={validationDuplicateLanguage}/>
          <Lookup dataSource={languages} valueExpr="id" displayExpr="name" />
        </Column>
      </DataGrid>
    </>
  );
};

export default ImageTabTraduction;
