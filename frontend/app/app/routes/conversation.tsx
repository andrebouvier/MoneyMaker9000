import React from 'react';
import Navbar from '../components/layout/Navbar';
import { ConversationViewer } from '../components/conversation/ConversationViewer';

const ConversationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ConversationViewer />
    </div>
  );
};

export default ConversationPage;




