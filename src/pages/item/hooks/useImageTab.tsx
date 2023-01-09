import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { sendRequest } from '../../../utils/request';

const useImageTab = ({ dataSourceField, fieldId }: any) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [dataSource, setDataSource] = useState<Array<any>>(dataSourceField.length > 0 ? dataSourceField?.[0].value : []);
    const [selectedImage, setSelectedImage] = useState({});
    const params = useParams();

    const onUploadedReloadDatagrid = (resp: any) => {
        setVisiblePopup(false);

        if ('name' in selectedImage) {
            const cloneDataSource = Array.from(dataSource);
            const indexUploaded = dataSource.findIndex(item => item._id == resp._id);

            cloneDataSource[indexUploaded] = resp;
            setDataSource(cloneDataSource);
        } else
            setDataSource([...dataSource, resp]);

    }

    const onClickEdit = (e: any) => {
        const filterImage = dataSource.find(item => item._id == e.row.key);
        setSelectedImage(filterImage);
        setVisiblePopup(true);
    }

    const onClickAdd = (e: any) => {
        setSelectedImage({});
        setVisiblePopup(true);
    }

    const onHidePopup = (e?: any) => {
        setVisiblePopup(false);
    }

    const onClickDelete = (e: any) => {
        sendRequest(`http://localhost:3000/descriptor_items/${params.id}/deleteImage`, 'POST', {
            fieldId,
            imageId: e.row.key,
            imageURI: e.row.data.uri

        }).then(resp => {
            const cloneDataSource = dataSource.filter(item => item._id != e.row.key);
            setDataSource(cloneDataSource);
        });
    }

    return {
        visiblePopup, onClickAdd, onHidePopup, dataSource, onUploadedReloadDatagrid, onClickEdit, selectedImage, onClickDelete
    }
}

export default useImageTab