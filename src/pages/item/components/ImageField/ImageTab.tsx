import useImageTab from '../../hooks/useImageTab';
import ImageFormUpload from './ImageFormUpload'
import ImageMasterTable from './ImageMasterTable'

const ImageTab = ({ fieldId, dataSourceField }: any) => {
  const { onClickAdd, onClickDelete, onHidePopup, visiblePopup, onUploadedReloadDatagrid, dataSource, onClickEdit, selectedImage } = useImageTab({dataSourceField, fieldId});

  return (
    <div>
      <ImageFormUpload fieldId={fieldId} visiblePopup={visiblePopup} onHidePopup={onHidePopup} onUploadedReloadDatagrid={onUploadedReloadDatagrid} selectedImage={selectedImage} />
      <ImageMasterTable onClickAdd={onClickAdd} dataSource={dataSource} onClickEdit={onClickEdit} onClickDelete={onClickDelete} />
    </div>
  )
}

export default ImageTab
