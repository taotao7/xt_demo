import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  Chat,
  Channel,
  ChannelList,
  ChannelHeader,
  MessageInput,
  VirtualizedMessageList,
  Window,
} from 'stream-chat-react';
import './App.css';
import 'stream-chat-react/dist/css/v2/index.css';
import { useClient } from './hooks/useClient';

const userToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZHJ5LXdpbGRmbG93ZXItMSIsImV4cCI6MTY2ODI2NzYzMn0.uicOClDVVSFhci5BZwAYxxqS2Ku7gvgDjkxB2lDJNhU';
const user = {
  id: 'dry-wildflower-1',
  name: 'dry',
  image: 'https://getstream.io/random_png/?id=dry-wildflower-1&name=dry',
};
const filters = { type: 'messaging', members: { $in: ['dry-wildflower-1'] } };
const sort = { last_message_at: -1 };

const Index = () => {
  const chatClient = useClient({
    apiKey: 'dz5f4d5kzrue',
    userData: user,
    tokenOrProvider: userToken,
  });

  const [channel, setChannel] = useState(undefined);

  useEffect(() => {
    if (!chatClient || channel) return;

    const spaceChannel = chatClient.channel('messaging', 'spacex', {
      image: 'https://goo.gl/Zefkbx',
      name: 'SpaceX launch discussion',
    });

    setChannel(spaceChannel);
  }, [chatClient]);

  if (!chatClient) return null;

  return (
    <Chat client={chatClient} theme="str-chat__theme-dark">
      <ChannelList filters={filters} sort={sort} />
      <Channel channel={channel}>
        <Window>
          <ChannelHeader live />
          <VirtualizedMessageList />
          <MessageInput focus />
        </Window>
      </Channel>
    </Chat>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </Router>
  );
}
