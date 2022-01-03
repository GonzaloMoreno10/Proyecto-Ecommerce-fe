import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useUser } from '../hooks/useUser';

let socket;
const CONNECTION_PORT = 'localhost:3000';

function Chat() {
  // Before Login
  const user = useUser();
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState('');
  const [userName, setUserName] = useState(user.email);

  // After Login
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, []);

  useEffect(() => {
    socket.emit('askMensajes');
    socket.on('mensajes', (data) => {
      console.log(data);
      setMessageList(data);
    });
  }, []);

  const sendMessage = async () => {
    let messageContent = {
      author: {
        id: user.id,
        nombre: user.nombre,
        avatar: user.avatar,
        edad: user.edad,
        email: user.email,
      },
      message: message,
    };

    await socket.emit('mensajes', messageContent);
    socket.emit('askMensajes');
    setMessage('');
  };

  return (
    <div className="container" style={{ textAlign: 'center', padding: '20px' }}>
      <div className="chatContainer">
        <div className="messages">
          {!messageList.length
            ? ''
            : messageList.map((val, key) => {
                return (
                  <div
                    className="messageContainer"
                    id={user.email === val?.author?.email ? 'You' : 'Other'}
                  >
                    <div className="messageIndividual">
                      <img
                        src={val?.author?.avatar}
                        alt=""
                        style={{
                          width: '25px',
                          height: '25px',
                          borderRadius: '15px',
                        }}
                      />
                      {val?.texto ? val.texto : ''}
                    </div>
                  </div>
                );
              })}
        </div>

        <div className="messageInputs">
          <input
            type="text"
            placeholder="Message..."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
