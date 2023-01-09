import React from 'react'
import FileUploader from 'devextreme-react/file-uploader'
import './style.css'

function getBase64(file: any) {
  return new Promise((res, rej) => {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      res(reader.result)
    }
    reader.onerror = function (error) {
      console.log('Error: ', error)
      rej(error)
    }
  })
}

class FileUploaderImage extends React.Component<any, any> {

  allowedFileExtensions: string[] | undefined
  fileUploadRef: React.RefObject<FileUploader>
  nativeElement: React.RefObject<HTMLDivElement>

  constructor(props: any) {
    super(props)

    this.state = {
      isDropZoneActive: false,
      imageSource: props?.imageSource ?? '',
      textVisible: true,
      fileSelected: null
    }
    this.allowedFileExtensions = ['.jpg', '.jpeg', '.gif', '.png']

    this.fileUploadRef = React.createRef()
    this.nativeElement = React.createRef()

    this.onDropZoneEnter = this.onDropZoneEnter.bind(this)
    this.onDropZoneLeave = this.onDropZoneLeave.bind(this)
  }

  componentDidMount(): void {
    this.fileUploadRef.current?.instance?.option({
      dropZone: this.nativeElement.current ?? '',
      dialogTrigger: this.nativeElement.current ?? '',
    });
  }

  getImage(): File {
    return this.state.fileSelected
  }

  render() {
    const {
      isDropZoneActive,
      imageSource,
      textVisible,
    } = this.state
    return (
      <div className="widget-container flex-box">
        <span>Image</span>
        <div
        ref={this.nativeElement}
          id="dropzone-external"
          className={`flex-box ${
            isDropZoneActive
              ? 'dx-theme-accent-as-border-color dropzone-active'
              : 'dx-theme-border-color'
          }`}
        >
          {imageSource && <img id="dropzone-image" src={imageSource} alt="" />}
          {textVisible && (
            <div id="dropzone-text" className="flex-box">
              <span>Drag & Drop the desired file</span>
              <span>…or click to browse for a file instead.</span>
            </div>
          )}
        </div>
        <FileUploader
          ref={this.fileUploadRef}
          id="file-uploader"
          dialogTrigger="#dropzone-external"
          dropZone="#dropzone-external"
          multiple={false}
          allowedFileExtensions={this.allowedFileExtensions}
          uploadMode="useButtons"
          visible={false}
          onDropZoneEnter={this.onDropZoneEnter}
          onDropZoneLeave={this.onDropZoneLeave}
          onValueChanged={this.onValueChanged}
        ></FileUploader>
      </div>
    )
  }

  onValueChanged = async (e: any) => {
    const res = await getBase64(e.value[0]);

    this.props.changeNameImage(e.value[0].name);

    this.setState({
      imageSource: res,
      fileSelected: e.value[0]
    })
  }

  onDropZoneEnter(e: any) {
    if (e.dropZoneElement.id === 'dropzone-external') {
      this.setState({ isDropZoneActive: true })
    }
  }

  onDropZoneLeave(e: any) {
    if (e.dropZoneElement.id === 'dropzone-external') {
      this.setState({ isDropZoneActive: false })
    }
  }
}

export default FileUploaderImage
