import Popup from "devextreme-react/popup";
import Form from "devextreme-react/form";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import FileUploaderImage from "../components/ImageField/FileUploaderImage";
import { sendRequest } from "../../../utils/request";
import { DescriptorContext } from "../../screens/hooks/useDescriptorProvider";
import { useParams } from "react-router-dom";

const useFormUpload = ({ onHidePopup, fieldId, visiblePopup, selectedImage }: any) => {
  const { descriptor } = useContext(DescriptorContext);
  const fileUploaderRef = useRef<FileUploaderImage>(null);
  const formRef = useRef<Form>(null);
  const popupRef = useRef<Popup>(null);
  const params = useParams();
  const [formData, setFormData] = useState({
    name: '',
    uri: '',
    traductionName: [],
  });

  useEffect(() => {
    if (!('_id' in selectedImage))
      setFormData({
        name: '',
        traductionName: [],
        uri: ''
      })
    else
      setFormData({
        name: selectedImage.name,
        traductionName: selectedImage?.traduction ?? [],
        uri: selectedImage?.uri
      })
  }, [visiblePopup])


  const onSaveEvent = async (imageId?: string) => {
    const result = fileUploaderRef.current?.getImage();
    let urlImage = formRef.current?.instance.option('formData').uri ?? '';

    if (result) {
      try {
        const form = new FormData();
        form.append("replaceImage", urlImage);
        form.append("image", result);

        const responseApi = await fetch("http://localhost:3007/upload", {
          method: "POST",
          body: form,
        });

        urlImage = await responseApi.text();
      } catch (err) {
        console.log(err);
        throw Error('error when upload image to server');
      }
    }

    if(!result && urlImage == '')
      throw Error('Please select an image');

    const formBody = {
      ...formRef.current?.instance.option('formData'),
      imageId: imageId,
      descriptorId: descriptor.descriptorId,
      descriptorItemId: params.id,
      uri: urlImage,
      fieldId: fieldId
    };

    try {
      const responseApiDescriptor = await sendRequest(`http://localhost:3000/descriptor_items/${params.id}/uploadImage`, 'POST', formBody);
      return responseApiDescriptor;
    } catch (err) {
      console.log(err);
      throw new Error('error when save image data into database');
    }

  };


  const onCancelButtonOptions = useMemo(
    () => ({
      icon: "plus",
      text: "Cancel",
      onClick: () => {
        onHidePopup();
      },
    }),
    []
  );

  const changeNameImage = (fileName: string) => {
    setFormData((pre) => ({
      ...pre,
      name: fileName,
    }));
  };

  return {
    changeNameImage,
    onCancelButtonOptions,
    popupRef,
    formData,
    fileUploaderRef,
    formRef,
    onSaveEvent
  };
};

export default useFormUpload;
