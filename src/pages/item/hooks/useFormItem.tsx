import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDescriptorContext } from "../context/DescriptorContext";
import ActionsItem from "../utils/ActionsItem";

let dataTableContent: Array<any> = [];

const providerActions = new ActionsItem();

const useFormItem = () => {
  const { id: descriptorId } = useDescriptorContext();
  const navigate = useNavigate();
  const formRef = useRef<any>(null);
  const params = useParams();
  const [itemData, setItemData] = useState({
    name: "",
    countryIds: [],
    fields: [],
    referencesIds: [],
  });

  useEffect(() => {
    dataTableContent = [];

    if (params?.id) {
      providerActions
        .fetchResource({ keyAction: "GET_BY_ID", id: params.id })
        .then((data) => {
          setItemData(data);
          return;
        });
    }
  }, []);

  const onClickSave = () => {
    const x = formRef.current.instance.validate();
    if (!x.isValid) return false;

    let actionKey = "CREATE";
    if ("id" in params) actionKey = "UPDATE";

    const formDataFetch = {
      descriptorId,
      ...formRef.current?.instance.option("formData"),
      fields: dataTableContent,
    };

    providerActions
      .fetchResource({
        keyAction: actionKey,
        data: formDataFetch,
        id: params?.id,
      })
      .then((resp) => {
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
    setItemData,
  };
};

export default useFormItem;
