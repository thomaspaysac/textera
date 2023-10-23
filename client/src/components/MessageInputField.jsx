export const MessageInputField = (props) => {
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
        <input type="text" id='text_input' name='text_input' />
        <button type="submit">Send</button>
      </form>
    </div>
    
  )
}