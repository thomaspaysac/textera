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
    const data = Object.fromEntries(formData.entries());
    data['author'] = localStorage.user_id;
    data['conversation'] = props.conversationID;
    const req = await fetch('http://localhost:3000/messages/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
  }

  return (
    <div className="message-input">
      <form id='input_form' onSubmit={submitInput}>
        <textarea placeholder="Message" rows='1'></textarea>
        <label htmlFor="file-upload" className="file-upload_button"></label>
        <input type='file' id='file-upload' />
        <button type="submit">Send</button>
      </form>
    </div>
    
  )
}