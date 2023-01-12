import { Form } from "devextreme-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActionsDescriptor from "../utils/actionsDescriptor";

const providerDescriptor = new ActionsDescriptor();

const useFormDescriptor = () => {
  const params = useParams();
  const [classificationData, setClassificationData] = useState<Array<any>>([]);
  const [fieldData, setFieldData] = useState<Array<any>>([]);
  const [fieldFiltered, setFieldFiltered] = useState<Array<any>>([]);
  const [relationshipData, setRelationshipData] = useState<Array<any>>([]);
  const [firstRenderData, setFirstRenderData] = useState<any>();
  const formRef = useRef<Form>(null);
  const navigate = useNavigate();

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
      setRelationshipData(resp.relationships);
    });

    if (params?.id) {
      providerDescriptor.filterById(params?.id).then((resp) => {
        setFormData({...resp});
        setFirstRenderData({...resp});
      });
    }
  }, []);

  const filterFields = (e: any) => {
    const classificationId = e?.value;

    const filtered = fieldData.filter((item) =>
      item?.classificationId.includes(classificationId)
    );

    if (e?.value != firstRenderData?.classificationId)
      setFormData({
        ...formData,
        fieldIds: [],
      });

    setFieldFiltered(filtered);
  };

  const onClickSave = () => {
    const formValidating = formRef?.current?.instance.validate();
    if (!formValidating?.isValid) return;

    const dataContent = formRef.current?.instance.option("formData");

    providerDescriptor
      .sendChange(providerDescriptor.URL, {
        type: params?.id ? "update" : "insert",
        data: dataContent,
        key: params?.id,
      })
      .then((resp) => {
        console.log(resp);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    params,
    relationshipData,
    classificationData,
    fieldFiltered,
    formRef,
    formData,
    filterFields,
    onClickSave,
  };
};

export default useFormDescriptor;
