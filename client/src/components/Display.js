import React, { useState } from "react";
import Header from "./Header";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./Chat.css";
function Display({ channel, setChannel }) {
  const [Joined, setJoined] = useState(
    channel.state.watcher_count === 2
  );

  channel.on("user.watching.start", (event) => {
    setJoined(event.watcher_count === 2);
  });
  if (!Joined) {
    return <div> Waiting for other user join...</div>;
  }
  return (
    <div className="Chat-Container">
      <Header/>
      <Window>
        <MessageList
          disableDateSeparator
          closeReactionSelectorOnClick
          hideDeletedMessages
          messageActions={["react"]}
        />
        <MessageInput noFiles />
      </Window>
    </div>
  );
}

export default Display;