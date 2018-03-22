import React,{Component} from 'react';
import Dropzone from 'react-dropzone'
import './reactDropzone.css';



const handleDropRejected = (...args) => console.log('reject', args)

class ImageUpload extends Component {
  constructor(props) {
    super(props)
    
    this.state = { preview: null }
    this.handleDrop = this.handleDrop.bind(this)
  }
  
  handleDrop([{ preview }]) {
    this.setState({ preview })
  }
  
  render() {
    const { preview } = this.state
    
    return (    
      <section>
        <Dropzone className = "dropzonePreview" onDrop={ this.handleDrop } accept="image/jpeg,image/jpg,image/tiff,image/gif" multiple={ false } onDropRejected={ handleDropRejected }>
          <i className="fa fa-cloud-upload-alt"></i>
           click to upload.
        </Dropzone>
        <div className = "images">
          { preview &&
            <img src={ preview } alt="image preview" />
          }
        </div>
        
      </section>
    )
  }
}
export default ImageUpload;