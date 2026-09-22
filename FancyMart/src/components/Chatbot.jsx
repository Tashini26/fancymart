import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Fab,
  Paper,
  Typography,
  IconButton,
  TextField,
  Avatar,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
  SmartToy as BotIcon,
} from '@mui/icons-material';

const initialMessages = [
  { id: 1, text: "Hi there! 👋 I'm FancyBot. How can I help you today?", sender: 'bot' },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "Thanks for reaching out! A human agent will get back to you shortly. In the meantime, feel free to browse our latest collections.",
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <Zoom in={!isOpen} unmountOnExit>
        <Fab
          color="primary"
          aria-label="chat"
          onClick={toggleChat}
          sx={{
            width: { xs: 48, md: 56 },
            height: { xs: 48, md: 56 },
            bgcolor: '#6D28D9',
            '&:hover': { bgcolor: '#4F46E5' },
            boxShadow: '0 8px 24px rgba(109,40,217,0.4)',
          }}
        >
          <ChatIcon sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }} />
        </Fab>
      </Zoom>

      {/* Chat Window */}
      <Fade in={isOpen}>
        <Paper
          elevation={12}
          sx={{
            position: 'fixed',
            bottom: { xs: 0, sm: 90 },
            right: { xs: 0, sm: 24 },
            width: { xs: '100%', sm: 380 },
            height: { xs: '100%', sm: 600 },
            maxHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: { xs: 0, sm: 4 },
            overflow: 'hidden',
            zIndex: 9999,
            boxShadow: { xs: 'none', sm: '0 12px 40px rgba(0,0,0,0.15)' },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              background: 'linear-gradient(135deg, #6D28D9, #4F46E5)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                <BotIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                  FancyBot
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981' }} />
                  Online
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={toggleChat} sx={{ color: 'white' }} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages Area */}
          <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Box
                  sx={{
                    maxWidth: '80%',
                    p: 1.5,
                    borderRadius: 2.5,
                    borderBottomRightRadius: msg.sender === 'user' ? 4 : 2.5,
                    borderBottomLeftRadius: msg.sender === 'bot' ? 4 : 2.5,
                    bgcolor: msg.sender === 'user' ? '#6D28D9' : '#ffffff',
                    color: msg.sender === 'user' ? 'white' : 'text.primary',
                    boxShadow: msg.sender === 'bot' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none',
                  }}
                >
                  <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                    {msg.text}
                  </Typography>
                </Box>
              </Box>
            ))}
            {isTyping && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box sx={{ maxWidth: '80%', p: 1.5, borderRadius: 2.5, borderBottomLeftRadius: 4, bgcolor: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    typing...
                  </Typography>
                </Box>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input Area */}
          <Box
            component="form"
            onSubmit={handleSend}
            sx={{
              p: 2,
              bgcolor: '#ffffff',
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 6,
                  bgcolor: '#f1f5f9',
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': { border: 'none' },
                },
              }}
            />
            <IconButton
              type="submit"
              color="primary"
              disabled={!inputValue.trim()}
              sx={{
                bgcolor: inputValue.trim() ? 'rgba(109,40,217,0.1)' : 'transparent',
                color: '#6D28D9',
                '&:hover': { bgcolor: 'rgba(109,40,217,0.2)' },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Fade>
    </>
  );
};

export default Chatbot;
