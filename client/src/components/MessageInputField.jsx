import { useState, useEffect, useContext } from 'react';
import { userContext } from '../App';
import sendIcon from '../assets/icons/send.png'
import imageUpload from '../assets/icons/image_upload_black.png'

export const MessageInputField = (props) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const userData = useContext(userContext);

  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput() {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
  }

  const submitInput = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (data.file_upload.size === 0 || data.file_upload.type.includes('image')) {
      setErrorMessage(null);
      await fetch('http://localhost:3000/messages/create', {
      //await fetch('https://textera-production.up.railway.app/messages/create', {
        method: 'POST',
        body: formData,
      })
      .then(e.target.reset())
      .then(props.onSend())    
    } else {
      setErrorMessage('Wrong file type')
    }
  }

  const ErrorContainer = () => {
    if (!errorMessage) {
      return null
    }

    return (
      <div className='error-container'>
        {errorMessage}
      </div>
    )
  }

  return (
    <div className="message-input">
      <form id='input_form' onSubmit={submitInput}>
        <textarea id="text_input" name="text_input" placeholder="Message" rows='1'></textarea>
        <label htmlFor="file_upload" className="file-upload_button">
          <img src={imageUpload} alt='attach file' />
        </label>
        <input type='file' id='file_upload' name='file_upload' accept="image/*" />
        <input name='author' style={{display: "none"}} value={userData.user_metadata.uid} readOnly />
        <input name='conversation' style={{display: "none"}} value={props.conversationID} readOnly />
        <input name='group' style={{display: "none"}} value={props.groupID} readOnly />
        <button type="submit">
          <img src={sendIcon} alt="send message" />
        </button>
        <ErrorContainer />
      </form>
    </div>
    
  )
}