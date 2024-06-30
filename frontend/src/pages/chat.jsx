import { ChatEngine } from 'react-chat-engine';
import './chat.css';
import ChatFeed from '../components/Chatfeed';
import { useParams } from 'react-router-dom';


const Chat = () => {

    return (
        <div className='chatContainer'>
            <ChatEngine
                height="90vh"
                width="160vw"
                projectID="00d688c1-a94c-40a3-b9bc-9bb03b6beb8f"
                userName={localStorage.getItem('username')}
                userSecret={localStorage.getItem('password')}
                renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
            />
        </div>
    )
}

export default Chat;