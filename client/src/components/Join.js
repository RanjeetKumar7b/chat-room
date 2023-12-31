import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Display from "./Display";
import CustomInput from "./CustomInput";
function Join() {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);
  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Display channel={channel} setChannel={setChannel} />
        </Channel>
      ) : (
        <div className="join">
          <h4>Create Chat Room</h4>
          <input
            placeholder="Enter your friends user name"
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          /> 
          <button onClick={createChannel}> Join</button>
        </div>
      )}
    </>
  );
}

export default Join;