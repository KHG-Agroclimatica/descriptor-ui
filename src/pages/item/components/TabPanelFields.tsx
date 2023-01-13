import TabPanel, { Item as ItemTab } from "devextreme-react/tab-panel";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ConfigEnv } from "../../../utils/configEnv";
import { sendRequest } from "../../../utils/request";
import ImageList from "./ImageField/ImageTab";
import RichTextFieldColumn from "./RichTextFieldColumn";

const TagPanelFields = ({
  descriptorId,
  updateSourceDataTable,
  datasourceItems,
}: any) => {
  const [fields, setFields] = useState([]);
  const params = useParams();

  useEffect(() => {
    sendRequest(ConfigEnv.DESCRIPTOR_API_URL+"/descriptor/" + descriptorId + "/fields").then(
      (resp) => {
        setFields(resp);
      }
    );
  }, []);

  return (
    <TabPanel animationEnabled={true} swipeEnabled={true} className="mt-4">
      {fields.map((item: any, index: number) => {
        let itemSource = [];
        if (datasourceItems)
          itemSource = datasourceItems.fields.filter(
            (fieldItem: any) => fieldItem.fieldId == item._id
          );

        switch (item?.typeField) {
          case "RICH_TEXT":
            return (
              <ItemTab title={item.name} key={index.toString()}>
                <RichTextFieldColumn
                  titleForm={item.name}
                  itemSource={itemSource}
                  id={item._id}
                  onChangeTable={updateSourceDataTable}
                />
              </ItemTab>
            );

          default:
            if('id' in params)
              return (
                <ItemTab title={item.name} key={index.toString()}>
                  <ImageList fieldId={item._id} dataSourceField={itemSource}/>
                </ItemTab>
              );
            else
              return null;
        }
      })}
    </TabPanel>
  );
};
export default TagPanelFields;
