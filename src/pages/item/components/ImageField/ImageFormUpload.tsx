import { ScrollView } from "devextreme-react";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import Popup, { ToolbarItem } from "devextreme-react/popup";
import FileUploaderImage from "./FileUploaderImage";
import ImageTabTraduction from "./ImageTabTraduction";
import useFormUpload from "../../hooks/useFormUpload";
import NotifyWarning from "../../../../components/NotifyWarning";

const ImageFormUpload = ({ visiblePopup, onHidePopup, fieldId, onUploadedReloadDatagrid, selectedImage }: any) => {
  const {
    changeNameImage,
    formData,
    onCancelButtonOptions,
    popupRef,
    fileUploaderRef,
    formRef,
    onSaveEvent
  } = useFormUpload({ onHidePopup, fieldId, visiblePopup, selectedImage });

  const uploadImageForm = () => {

    if (!formData.name)
      NotifyWarning('Name field is required');
    else if (formData.traductionName.length == 0)
      NotifyWarning('Traduction name is required');
    else {
      onSaveEvent(selectedImage?._id).then(resp => {
        onUploadedReloadDatagrid(resp);
      }).catch(err => {
        NotifyWarning(err.message);
      });
    }
  }

  const onSaveButtonOptions = ({
    icon: "email",
    text: "Send",
    onClick: uploadImageForm,
  });

  return (
    <Popup
      visible={visiblePopup}
      hideOnOutsideClick={true}
      showCloseButton={false}
      showTitle={true}
      title="Upload Image"
      container=".dx-viewport"
      onHiding={onHidePopup}
      ref={popupRef}
    >
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        options={onSaveButtonOptions}
      />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        options={onCancelButtonOptions}
      />

      <ScrollView height={"100%"} width={"100%"}>
        <div className="row">
          <div className="col mr-2">
            {visiblePopup && (
              <FileUploaderImage
                ref={fileUploaderRef}
                changeNameImage={changeNameImage}
                imageSource={selectedImage?.uri}
              />
            )}
          </div>
          <div className="col ml-2">
            <Form formData={formData} ref={formRef}>
              <GroupItem caption="File description">
                <SimpleItem dataField="name" />
                <SimpleItem
                  dataField="uri"
                  editorOptions={{ disabled: true }}
                />
              </GroupItem>
              <GroupItem caption="Name translation">
                <ImageTabTraduction nameTranslation={formData.traductionName} />
              </GroupItem>
            </Form>
          </div>
        </div>
      </ScrollView>
    </Popup>
  );
};

export default ImageFormUpload;
