'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMessageCircle,
  FiX,
  FiSend,
  FiUser,
  FiShoppingBag,
  FiStar,
  FiBell,
} from 'react-icons/fi'
import chatbotService from '../lib/chatbotService'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initialize welcome message when chatbot opens
    if (isOpen && messages.length === 0) {
      const welcomeMessage = chatbotService.getWelcomeMessage()

      setMessages([
        {
          id: 1,
          text: welcomeMessage,
          sender: 'bot',
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const currentMessage = inputMessage

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Use the enhanced LangChain service
      const aiResponse = await chatbotService.sendMessage(currentMessage)

      const botMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)

      let errorText =
        "I'm sorry, I'm having trouble connecting right now. Please try again later or contact our support team."

      // Handle specific error cases
      if (error.response?.status === 402 || error.response?.status === 429) {
        errorText = chatbotService.getFallbackResponse(currentMessage)
      } else if (error.code === 'NETWORK_ERROR' || !navigator.onLine) {
        errorText = chatbotService.getFallbackResponse(currentMessage)
      }

      const errorMessage = {
        id: Date.now() + 1,
        text: errorText,
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      {/* Responsive Tunisian-Red Themed Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="relative w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white group border border-red-800"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <FiMessageCircle
          size={20}
          className="transition-transform duration-200 group-hover:scale-110"
        />

        {/* Small notification icon with bell */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-red-600 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
          >
            <FiBell size={10} className="text-red-600 animate-pulse" />
          </motion.div>
        )}
      </motion.button>

      {/* Responsive Tunisian-Themed Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-end p-2 md:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Responsive Backdrop */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black/20 to-red-800/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Responsive Chat Window */}
            <motion.div
              className="relative w-full max-w-sm md:max-w-md h-[85vh] md:h-[500px] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl border-2 border-red-200 flex flex-col overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              style={{
                background: 'linear-gradient(145deg, #ffffff 0%, #fef7f7 100%)',
              }}
            >
              {/* Responsive Header */}
              <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-3 md:p-4 flex items-center justify-between text-white relative overflow-hidden">
                {/* Decorative pattern - hidden on mobile */}
                <div className="absolute inset-0 opacity-10 hidden md:block">
                  <div className="absolute top-2 left-4 w-6 h-6 border-2 border-white rounded-full"></div>
                  <div className="absolute top-4 right-8 w-4 h-4 border border-white transform rotate-45"></div>
                  <div className="absolute bottom-2 left-8 w-3 h-3 bg-white rounded-full"></div>
                </div>

                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <FiShoppingBag
                      size={16}
                      className="text-white md:w-5 md:h-5"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg">
                      Hanouti Assistant
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-xs text-red-100">Available 24/7</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-all duration-200 relative z-10 group"
                >
                  <FiX
                    size={18}
                    className="md:w-5 md:h-5 group-hover:rotate-90 transition-transform duration-200"
                  />
                </button>
              </div>

              {/* Responsive Messages Area */}
              <div
                className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4"
                style={{
                  background:
                    'linear-gradient(to bottom, #fef7f7 0%, #fdf2f2 100%)',
                }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 md:gap-3 ${
                      message.sender === 'user'
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-red-200">
                        <FiShoppingBag
                          size={12}
                          className="md:w-4 md:h-4 text-white"
                        />
                      </div>
                    )}

                    <div className="flex flex-col max-w-[80%] md:max-w-[75%]">
                      <div
                        className={`p-3 md:p-4 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-br from-red-600 to-red-700 text-white ml-auto rounded-br-md shadow-lg border border-red-800'
                            : 'bg-white border-2 border-red-100 text-gray-800 rounded-bl-md shadow-sm'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.text}
                        </p>
                      </div>
                      <p
                        className={`text-xs mt-1 md:mt-2 px-2 ${
                          message.sender === 'user'
                            ? 'text-red-400 text-right'
                            : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    {message.sender === 'user' && (
                      <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-gray-300">
                        <FiUser
                          size={12}
                          className="md:w-4 md:h-4 text-white"
                        />
                      </div>
                    )}
                  </div>
                ))}

                {/* Responsive Typing Indicator */}
                {isLoading && (
                  <div className="flex gap-2 md:gap-3 justify-start">
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <FiShoppingBag
                        size={12}
                        className="md:w-4 md:h-4 text-white animate-pulse"
                      />
                    </div>
                    <div className="bg-white border-2 border-red-100 p-3 md:p-4 rounded-2xl rounded-bl-md shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Responsive Input Area */}
              <div className="p-3 md:p-4 bg-gradient-to-r from-red-50 to-white border-t-2 border-red-200">
                <div className="flex gap-2 md:gap-3 items-end">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message here..."
                      className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-red-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm placeholder-gray-500 bg-white shadow-sm transition-all duration-200"
                      disabled={isLoading}
                    />
                    {/* Decorative corner - hidden on mobile */}
                    <div className="absolute top-1 right-1 w-2 h-2 bg-red-200 rounded-full opacity-50 hidden md:block"></div>
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed rounded-2xl flex items-center justify-center text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:shadow-sm border-2 border-red-800 disabled:border-gray-300"
                  >
                    <FiSend size={16} className="md:w-5 md:h-5 ml-0.5" />
                  </button>
                </div>

                {/* Decorative element - hidden on mobile */}
                <div className="justify-center mt-2 hidden md:flex">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-red-300 rounded-full"></div>
                    <div className="w-2 h-1 bg-red-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-red-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Chatbot
