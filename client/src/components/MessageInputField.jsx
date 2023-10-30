import { useState, useEffect } from 'react';
import attach from '../assets/icons/file_upload.png'

export const MessageInputField = (props) => {
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
    await fetch('http://localhost:3000/messages/create', {
    //const req = await fetch('https://textera-production.up.railway.app/messages/create', {
      method: 'POST',
      body: formData,
    })
    .then(e.target.reset())
    .then(props.onSend())
  }

  return (
    <div className="message-input">
      <form id='input_form' onSubmit={submitInput}>
        <textarea id="text_input" name="text_input" placeholder="Message" rows='1'></textarea>
        <label htmlFor="file_upload" className="file-upload_button">
          <img src={attach} alt='attach file' />
        </label>
        <input type='file' id='file_upload' name='file_upload' />
        <input name='author' style={{display: "none"}} value={localStorage.user_id} readOnly />
        <input name='conversation' style={{display: "none"}} value={props.conversationID} readOnly />
        <input name='group' style={{display: "none"}} value={props.groupID} readOnly />
        <button type="submit">Send</button>
      </form>
    </div>
    
  )
}