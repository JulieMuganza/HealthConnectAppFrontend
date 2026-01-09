import React, { useState } from 'react';
import Card from './Card';
import Avatar from './Avatar';
import Button from './Button';
import Input from './Input';
import { PaperPlaneRight } from '@phosphor-icons/react';
import './ChatInterface.css';

const ChatInterface = ({ messages, recipient, onSend }) => {
    const [inputText, setInputText] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        onSend(inputText);
        setInputText('');
    };

    return (
        <Card className="chat-interface h-full p-0">
            <div className="chat-header">
                <Avatar src={recipient.avatar} size="md" status="online" />
                <div>
                    <h4>{recipient.name}</h4>
                    <span className="status-text">{recipient.role === 'doctor' ? 'Usually replies in 1h' : 'Online'}</span>
                </div>
            </div>

            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-bubble ${msg.isMine ? 'mine' : 'theirs'}`}>
                        {!msg.isMine && <Avatar src={msg.avatar} size="sm" className="message-avatar" />}
                        <div className="bubble-content">
                            <p>{msg.content}</p>
                            <span className="message-time">{msg.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="chat-input-area">
                <form onSubmit={handleSend} className="chat-form">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="chat-input-simple"
                    />
                    <Button type="submit" variant="primary" style={{ borderRadius: '50%', padding: '0', width: '40px', height: '40px' }}>
                        <PaperPlaneRight size={20} weight="fill" />
                    </Button>
                </form>
            </div>
        </Card>
    );
};

export default ChatInterface;
