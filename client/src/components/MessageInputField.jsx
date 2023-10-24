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
    // http://localhost:3000/messages/create
    const req = await fetch('https://textera-production.up.railway.app/messages/create', {
      method: 'POST',
      body: formData,
      /*headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),*/
    })
  }

  return (
    <div className="message-input">
      <form id='input_form' onSubmit={submitInput}>
        <textarea id="text_input" name="text_input" placeholder="Message" rows='1'></textarea>
        <label htmlFor="file_upload" className="file-upload_button"></label>
        <input type='file' id='file_upload' name='file_upload' />
        <input name='author' style={{display: "none"}} value={localStorage.user_id} readOnly />
        <input name='conversation' style={{display: "none"}} value={props.conversationID} readOnly />
        <button type="submit">Send</button>
      </form>
    </div>
    
  )
}