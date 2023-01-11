import { Item } from "devextreme-react/form";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ActionsDescriptor from "../utils/actionsDescriptor";

const providerDescriptor = new ActionsDescriptor();

const useFormDescriptor = () => {
  const params = useParams();
  const [classificationData, setClassificationData] = useState<Array<any>>([]);
  const [fieldData, setFieldData] = useState<Array<any>>([]);
  const [fieldFiltered, setFieldFiltered] = useState<Array<any>>([]);
  const itemFieldRef = useRef<Item>(null);

  useEffect(() => {
    providerDescriptor.loadFields().then((resp) => {
      setFieldData(resp.fields);
      setClassificationData(resp.classifications);
    });
  }, []);

  const filterFields = (classificationId: String) => {
    const filtered = fieldData.filter((item) =>
      item?.classificationId.includes(classificationId)
    );
    console.log(filtered);
    
    
    setFieldFiltered(filtered);
  };

  return {
    params,
    classificationData,
    fieldFiltered,
    filterFields,
    itemFieldRef
  };
};

export default useFormDescriptor;
