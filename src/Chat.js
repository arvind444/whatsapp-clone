import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Chat.css'
import { InsertEmoticon, Mic } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase'

function Chat() {

    const [seed, Setseed] = useState("");

    const [input, SetInput] = useState("");

    const { roomId } = useParams();

    const [{ user }, dispatch] = useStateValue();

    const [roomName, setRoomName] = useState("");

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => 
                setRoomName(snapshot.data().name)
            )
            db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot =>(
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ))
                
        }
    }, [roomId])

    useEffect(() => {
        Setseed(Math.floor(Math.random() * 5000))
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        SetInput("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {new Date(messages[messages.length-1] ?.timestamp?.toDate()).toUTCString()} </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message =>(
                    <p className= {`chat__message ${message.name === user?.displayName && "chat__receiver"}`}> 
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                </p>
                ))}
                
            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input value={input} type="text" onChange={e => SetInput(e.target.value)} placeholder="Type a message..." />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>

                <Mic />
            </div>
        </div>
    )
}

export default Chat

