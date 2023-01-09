import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sendRequest } from "../../../utils/request";
import { useDescriptorContext } from "../context/DescriptorContext";

let dataTableContent: Array<any> = [];
const useFormItem = () => {
  const { id: descriptorId } = useDescriptorContext();
  const navigate = useNavigate();
  const formRef = useRef<any>(null);
  const params = useParams();
  const [itemData, setItemData] = useState({
    name: "",
    countryIds: [],
    fields: [],
  });

  useEffect(() => {
    dataTableContent = [];

    if (params?.id) {
      sendRequest(`http://localhost:3000/descriptor_items/${params.id}`).then(
        (data) => {
          setItemData({
            name: data.name,
            countryIds: data?.countryIds ?? [],
            fields: data.fields,
          });
          return;
        }
      );
    }
  }, []);

  const onClickSave = () => {
    const x = formRef.current.instance.validate();
    if (!x.isValid) return false;

    let metadataApi = {
      url: "http://localhost:3000/descriptor_items/create",
      method: "POST",
    };
    if ("id" in params)
      metadataApi = {
        url: `http://localhost:3000/descriptor_items/${params.id}`,
        method: "PUT",
      };

    sendRequest(metadataApi.url, metadataApi.method, {
      descriptorId,
      ...formRef.current?.instance.option("formData"),
      fields: dataTableContent,
    }).then((resp) => {
      navigate(-1);
    });
  };

  const updateSourceDataTable = (source: any) => {
    const hasItems = source.component.getDataSource();

    if ("_items" in hasItems) {
      const foundIndex = dataTableContent.findIndex(
        (item: any) => item.fieldId == source.element.id
      );

      if (foundIndex != -1) {
        const copyData = [...dataTableContent];
        copyData[foundIndex].value = hasItems._items;

        dataTableContent = copyData;
      } else {
        dataTableContent.push({
          fieldId: source.element.id,
          value: source.component.getDataSource()._items,
        });
      }
    }
  };

  return {
    updateSourceDataTable,
    onClickSave,
    formRef,
    descriptorId,
    itemData,
  };
};

export default useFormItem;
