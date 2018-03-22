import React,{Component} from 'react';
import Dropzone from 'react-dropzone'
import './editImageUpload.css';
import {storage} from './firebase';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';




const handleDropRejected = (...args) => console.log('reject', args)

class EditImageUpload extends Component {
  constructor(props) {
    super(props)
    this.state = { field: null }
    this.handleDrop = this.handleDrop.bind(this)
    this.storageRef = storage.ref('images')
  }
  
  handleDrop(field) {
    const fileName = this.newGuid()
    const blob = new Blob([field[0]], { type: "image/jpeg" })
    this.storageRef.child(fileName).put(blob)
      .then((snapshot) => {
        field  = snapshot.downloadURL;
          this.props.addImage(this.props.id, this.props.auth.uid, field);
          console.log(this.props.id, this.props.auth.uid);
          
          this.props.hideModal();
          NotificationManager.success('Profile Photo Changed');
      })  
     
  }
  
  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }  


  render() {
    const { field } = this.state
    
    return (    
      <section>
        <Dropzone className = "dropzonePreview" onDrop={ this.handleDrop }  multiple={ false } onDropRejected={ handleDropRejected }>
          <i className="fa fa-cloud-upload-alt"></i>
           click to upload new Image.
        </Dropzone>
        <div className = "images">
          { field &&
            <img src={ field } alt="image preview" />
          }
        </div>
        
      </section>
    )
  }
}
export default EditImageUpload;