import React, { useState, useMemo } from 'react';

interface ConversationMessage {
  type: 'human' | 'ai' | 'tool';
  content: string;
  toolName?: string;
  toolCallId?: string;
  toolArgs?: Record<string, any>;
}

export function ConversationViewer() {
  const [conversationText, setConversationText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoadingFile, setIsLoadingFile] = useState(false);

  // Parse the conversation text into structured messages
  const messages = useMemo(() => {
    if (!conversationText.trim()) return [];

    try {
      const parsed: ConversationMessage[] = [];
      // Remove ANSI escape codes
      const cleanedText = conversationText.replace(/\u001b\[[0-9;]*m/g, '');
      const lines = cleanedText.split('\n');
      
      let currentMessage: ConversationMessage | null = null;
      let currentContent: string[] = [];
      let inToolCall = false;
      let toolName = '';
      let toolCallId = '';
      let toolArgs: Record<string, any> = {};

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // Check for Human Message (with or without ANSI codes)
        if (line.includes('Human Message') || line.match(/={30,}.*Human Message.*={30,}/)) {
          if (currentMessage) {
            currentMessage.content = currentContent.join('\n').trim();
            parsed.push(currentMessage);
          }
          currentMessage = { type: 'human', content: '' };
          currentContent = [];
          inToolCall = false;
          toolName = '';
          toolCallId = '';
          toolArgs = {};
          continue;
        }
        
        // Check for AI Message
        if (line.includes('Ai Message') || line.match(/={30,}.*Ai Message.*={30,}/)) {
          if (currentMessage) {
            currentMessage.content = currentContent.join('\n').trim();
            parsed.push(currentMessage);
          }
          currentMessage = { type: 'ai', content: '' };
          currentContent = [];
          inToolCall = false;
          toolName = '';
          toolCallId = '';
          toolArgs = {};
          continue;
        }
        
        // Check for Tool Message
        if (line.includes('Tool Message') || line.match(/={30,}.*Tool Message.*={30,}/)) {
          if (currentMessage) {
            currentMessage.content = currentContent.join('\n').trim();
            parsed.push(currentMessage);
          }
          currentMessage = { type: 'tool', content: '', toolName: '', toolCallId: '', toolArgs: {} };
          currentContent = [];
          inToolCall = true;
          toolName = '';
          toolCallId = '';
          toolArgs = {};
          continue;
        }
        
        // Parse tool call information in Tool Messages
        if (inToolCall && currentMessage && currentMessage.type === 'tool') {
          if (line.trim().startsWith('Name:')) {
            toolName = line.replace(/Name:\s*/, '').trim();
            currentMessage.toolName = toolName;
            continue;
          } else if (line.includes('Call ID:') || line.includes('call_')) {
            const callIdMatch = line.match(/call_[a-zA-Z0-9]+/);
            if (callIdMatch) {
              toolCallId = callIdMatch[0];
              currentMessage.toolCallId = toolCallId;
            }
            continue;
          } else if (line.trim().startsWith('Args:') || line.match(/^\s+\w+:/)) {
            // Try to parse args
            const argMatch = line.match(/^\s+(\w+):\s*(.+)/);
            if (argMatch) {
              toolArgs[argMatch[1]] = argMatch[2].trim();
              currentMessage.toolArgs = { ...toolArgs };
            }
            continue;
          }
        }
        
        // Check for Tool Calls section in AI messages
        if (currentMessage?.type === 'ai' && line.includes('Tool Calls:')) {
          // Extract tool calls
          let j = i + 1;
          const toolCalls: string[] = [];
          while (j < lines.length && !lines[j].match(/={30,}/) && j < i + 20) {
            const toolLine = lines[j];
            if (toolLine.trim() && !toolLine.match(/^\s*$/)) {
              toolCalls.push(toolLine);
              const toolMatch = toolLine.match(/\s+(\w+)\s+\(([^)]+)\)/);
              if (toolMatch) {
                const toolCallName = toolMatch[1];
                const toolCallIdMatch = toolLine.match(/call_[a-zA-Z0-9]+/);
                if (toolCallIdMatch) {
                  // Store tool call info in the AI message
                  if (!currentMessage.toolArgs) currentMessage.toolArgs = {};
                  currentMessage.toolArgs[toolCallName] = toolCallIdMatch[0];
                }
              }
            }
            j++;
          }
          // Add tool calls to content
          currentContent.push('Tool Calls:');
          currentContent.push(...toolCalls);
          i = j - 1; // Skip processed lines
          continue;
        }
        
        // Skip separator lines (lines with only = characters)
        if (line.match(/^={30,}$/)) {
          continue;
        }
        
        // Skip empty lines at the start of a message
        if (!currentMessage && line.trim() === '') {
          continue;
        }
        
        // Add content to current message
        if (currentMessage) {
          currentContent.push(line);
        }
      }
      
      // Add the last message
      if (currentMessage) {
        currentMessage.content = currentContent.join('\n').trim();
        parsed.push(currentMessage);
      }
      
      // Keep only AI messages and drop empty tool blocks
      const aiMessages = parsed.filter(
        msg => msg.type === 'ai' && (msg.content || msg.toolName)
      );

      // Remove consecutive duplicate AI responses (often repeated after "Continue")
      const deduped: ConversationMessage[] = [];
      for (const msg of aiMessages) {
        const prev = deduped[deduped.length - 1];
        if (!prev || prev.content.trim() !== msg.content.trim()) {
          deduped.push(msg);
        }
      }

      return deduped;
    } catch (err) {
      setError('Error parsing conversation. Please check the format.');
      console.error('Parse error:', err);
      return [];
    }
  }, [conversationText]);

  const handlePaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConversationText(e.target.value);
    setError(null);
  };

  const handleLoadFromServer = async () => {
    setIsLoadingFile(true);
    setError(null);

    try {
      const response = await fetch('/api/conversation');
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      const content = (data && data.content) || '';
      setConversationText(content);

      if (!content.trim()) {
        setError('The backend conversation file is empty.');
      }
    } catch (err) {
      console.error('Failed to load conversation file:', err);
      setError('Could not load the conversation from the backend file.');
    } finally {
      setIsLoadingFile(false);
    }
  };

  const handleClear = () => {
    setConversationText('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text mb-4">Agentic Conversation Viewer</h1>
          <p className="text-text-secondary">
            Paste the conversation output from your forward propagate to visualize the agentic conversation flow.
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-6 bg-surface rounded-lg p-4 border border-border">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="conversation-input" className="text-text font-medium">
              Conversation Output
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLoadFromServer}
                disabled={isLoadingFile}
                className="text-sm text-text-secondary hover:text-text transition-colors disabled:opacity-60"
              >
                {isLoadingFile ? 'Loading...' : 'Load from backend file'}
              </button>
              <button
                onClick={handleClear}
                className="text-sm text-text-secondary hover:text-text transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
          <textarea
            id="conversation-input"
            value={conversationText}
            onChange={handlePaste}
            placeholder="Paste the conversation output here..."
            className="w-full h-48 p-3 bg-background border border-border rounded-md text-text font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>

        {/* Conversation Display */}
        {messages.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-text">
                Conversation ({messages.length} messages)
              </h2>
            </div>
            
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-4 border ${
                    message.type === 'human'
                      ? 'bg-primary/10 border-primary/30 ml-0'
                      : message.type === 'ai'
                      ? 'bg-blue-500/10 border-blue-500/30 ml-8'
                      : 'bg-purple-500/10 border-purple-500/30 ml-16'
                  }`}
                >
                  {/* Message Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        message.type === 'human'
                          ? 'bg-primary text-white'
                          : message.type === 'ai'
                          ? 'bg-blue-500 text-white'
                          : 'bg-purple-500 text-white'
                      }`}
                    >
                      {message.type === 'human'
                        ? '👤 Human'
                        : message.type === 'ai'
                        ? '🤖 AI Agent'
                        : '🔧 Tool'}
                    </span>
                    {message.toolName && (
                      <span className="text-xs text-text-secondary">
                        Tool: {message.toolName}
                      </span>
                    )}
                    {message.toolCallId && (
                      <span className="text-xs text-text-secondary font-mono">
                        ID: {message.toolCallId}
                      </span>
                    )}
                  </div>

                  {/* Tool Arguments */}
                  {message.toolArgs && Object.keys(message.toolArgs).length > 0 && (
                    <div className="mb-2 p-2 bg-background/50 rounded text-xs">
                      <div className="font-semibold text-text-secondary mb-1">Arguments:</div>
                      <pre className="text-text font-mono whitespace-pre-wrap">
                        {JSON.stringify(message.toolArgs, null, 2)}
                      </pre>
                    </div>
                  )}

                  {/* Message Content */}
                  <div className={`text-text whitespace-pre-wrap font-mono ${
                    message.type === 'ai' ? 'text-lg' : 'text-sm'
                  }`}>
                    {message.content || (message.toolName ? `Tool: ${message.toolName}` : 'No content')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {messages.length === 0 && conversationText && (
          <div className="text-center py-8 text-text-secondary">
            No messages found. Please check the conversation format.
          </div>
        )}
      </div>
    </div>
  );
}

