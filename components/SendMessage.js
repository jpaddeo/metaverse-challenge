import { useState } from 'react';
import { useMoralis } from 'react-moralis';

function SendMessage({ endOfMessagesRef }) {
  const { user, Moralis } = useMoralis();
  const [message, setMessage] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message) return;

    const Messages = Moralis.Object.extend('Messages');
    const messages = new Messages();
    messages
      .save({
        message,
        username: user.getUsername(),
        ethAddress: user.get('ethAddress'),
      })
      .then(
        (message) => {
          setMessage('');
          endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        },
        (error) => {
          console.error(error);
        }
      );
  };

  return (
    <form className='flex fixed bottom-10 bg-black  opacity-80 w-11/12 px-6 py-4 max-w-2xl shadow-xl rounded-full border-2 border-blue-400'>
      <input
        type='text'
        name='message'
        value={message}
        className='flex-grow outline-none bg-transparent text-white  placeholder-gray-500 pr-5'
        placeholder={`Enter a message ${user.getUsername()}`}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type='submit'
        disabled={!message}
        className={`font-bold text-pink-500 hover:text-pink-800 ${
          !message ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={sendMessage}
      >
        Send
      </button>
    </form>
  );
}

export default SendMessage;