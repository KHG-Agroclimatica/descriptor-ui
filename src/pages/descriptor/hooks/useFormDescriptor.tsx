import { Form } from "devextreme-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ActionsDescriptor from "../utils/actionsDescriptor";

const providerDescriptor = new ActionsDescriptor();

const useFormDescriptor = () => {
  const params = useParams();
  const [classificationData, setClassificationData] = useState<Array<any>>([]);
  const [fieldData, setFieldData] = useState<Array<any>>([]);
  const [fieldFiltered, setFieldFiltered] = useState<Array<any>>([]);
  const formRef = useRef<Form>(null);

  const [formData, setFormData] = useState({
    _id: params?.id ?? "",
    name: "",
    description: "",
    countryIds: [],
    classificationId: [],
    fieldIds: [],
  });

  useEffect(() => {
    providerDescriptor.loadFields().then((resp) => {
      setFieldData(resp.fields);
      setClassificationData(resp.classifications);
    });
  }, []);

  const filterFields = (e: any) => {
    const classificationId = e?.value;

    const filtered = fieldData.filter((item) =>
      item?.classificationId.includes(classificationId)
    );

    setFieldFiltered(filtered);
  };

  const onClickSave = () => {
    const isValid = formRef?.current?.instance.validate();
    if (!isValid) return;
    const dataContent = formRef.current?.instance.option("formData");
    
    
  };

  return {
    params,
    classificationData,
    fieldFiltered,
    filterFields,
    formRef,
    onClickSave,
    formData,
  };
};

export default useFormDescriptor;
