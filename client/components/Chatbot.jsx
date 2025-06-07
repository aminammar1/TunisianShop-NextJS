    'use client'

    import React, { useState, useRef, useEffect } from 'react'
    import { motion, AnimatePresence } from 'framer-motion'
    import {
    FiMessageCircle,
    FiX,
    FiSend,
    FiUser,
    FiShoppingBag,
    } from 'react-icons/fi'
    import { HiOutlineSparkles } from 'react-icons/hi'
    import axios from 'axios'

    export default function Chatbot() {
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
        // Dynamic welcome message when chatbot opens for the first time
        if (isOpen && messages.length === 0) {
        const hour = new Date().getHours()
        let greeting = 'Hello'

        if (hour < 12) greeting = 'Good morning'
        else if (hour < 18) greeting = 'Good afternoon'
        else greeting = 'Good evening'

        const welcomeText = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
            ? `${greeting}! 🛍️ Welcome to Hanouti Store! I'm here to help you find the perfect products, answer questions about orders, or assist with anything else you need. What can I help you with today?`
            : `${greeting}! 🛍️ Welcome to Hanouti Store! I'm in limited mode right now, but I can still help with basic questions about our products, delivery, and store policies. How can I assist you?`

        setMessages([
            {
            id: 1,
            text: welcomeText,
            sender: 'bot',
            timestamp: new Date(),
            },
        ])
        }
    }, [isOpen, messages.length])

    // Enhanced fallback responses for when API is down
    const getFallbackResponse = (message) => {
        const lowerMessage = message.toLowerCase()

        // Handle yes/no questions
        if (
        lowerMessage.includes('do you') ||
        lowerMessage.includes('can you') ||
        lowerMessage.includes('is there') ||
        lowerMessage.includes('are there') ||
        lowerMessage.endsWith('?')
        ) {
        if (
            lowerMessage.includes('free shipping') ||
            lowerMessage.includes('delivery free')
        ) {
            return 'Yes! 📦 We offer free delivery on all orders. Your items will be delivered right to your doorstep at no extra cost.'
        }

        if (
            lowerMessage.includes('cash on delivery') ||
            lowerMessage.includes('cod')
        ) {
            return 'Yes! 💰 We accept cash on delivery. You can pay when your order arrives at your location.'
        }

        if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
            return 'Yes! ✅ We have a return policy. Please check our terms or contact support for specific return procedures.'
        }

        if (
            lowerMessage.includes('track') ||
            lowerMessage.includes('order status')
        ) {
            return 'Yes! 📱 You can track your orders through your account dashboard. Login to see real-time order updates.'
        }

        return "I'm in limited mode right now, but I'd love to help! 🤖 Please browse our website or contact our support team for detailed answers to your questions."
        }

        if (
        lowerMessage.includes('hello') ||
        lowerMessage.includes('hi') ||
        lowerMessage.includes('hey')
        ) {
        return "Hello! 👋 Welcome to Hanouti Store! I'm currently running in limited mode. You can browse our products or contact our support team for assistance."
        }

        if (
        lowerMessage.includes('product') ||
        lowerMessage.includes('item') ||
        lowerMessage.includes('buy')
        ) {
        return '🛍️ You can browse our products by using the navigation menu or search function. Our products are organized by categories for easy browsing!'
        }

        if (
        lowerMessage.includes('order') ||
        lowerMessage.includes('shipping') ||
        lowerMessage.includes('delivery')
        ) {
        return '📦 For order-related questions, please check your account dashboard or contact our support team directly.'
        }

        if (
        lowerMessage.includes('price') ||
        lowerMessage.includes('cost') ||
        lowerMessage.includes('payment')
        ) {
        return '💰 All prices are displayed on our product pages. We accept various payment methods including credit cards through Stripe.'
        }

        if (
        lowerMessage.includes('contact') ||
        lowerMessage.includes('support') ||
        lowerMessage.includes('help')
        ) {
        return '📞 You can contact our support team through the contact form on our website or browse our FAQ section for quick answers!'
        }

        return "I'm currently running in limited mode due to high demand. 🤖 For the best assistance, please browse our website or contact our support team directly!"
    }

    const sendMessage = async () => {
        if (!inputMessage.trim()) return

        const currentMessage = inputMessage // Store for potential fallback use

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
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
            model: 'openai/gpt-4o',
            messages: [
                {
                role: 'system',
                content: `You are a helpful shopping assistant for Hanouti Store, an e-commerce platform in Tunisia. Your role is to:
                        - Provide clear, direct answers to yes/no questions
                        - Welcome customers warmly and naturally
                        - Help them find products and categories
                        - Answer questions about shopping, orders, and store policies  
                        - Provide helpful suggestions and product recommendations
                        - Be friendly, professional, and conversational
                        - Give specific, actionable advice
                        - Handle customer service inquiries
                        
                        For yes/no questions, start with a clear "Yes" or "No" followed by helpful details.
                        Keep responses under 120 words and always maintain a helpful, engaging tone.
                        Avoid repetitive welcome messages - vary your responses based on context.`,
                },
                {
                role: 'user',
                content: currentMessage,
                },
            ],
            max_tokens: 150,
            temperature: 0.7,
            },
            {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
                'HTTP-Referer':
                process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
                'X-Title': process.env.NEXT_PUBLIC_SITE_NAME || 'Hanouti Store',
            },
            }
        )

        const aiResponse =
            response.data.choices[0]?.message?.content ||
            'Sorry, I could not process your request.'

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
            "I'm sorry, I'm having trouble connecting right now. Please try again later or contact our support team! 😔"

        // Handle specific error cases for axios
        if (error.response?.status === 402 || error.response?.status === 429) {
            // Use fallback response when API credits are insufficient or rate limited
            errorText = getFallbackResponse(currentMessage)
        } else if (error.code === 'NETWORK_ERROR' || !navigator.onLine) {
            errorText = getFallbackResponse(currentMessage)
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
        <>
        {' '}
        {/* Floating Chat Button */}
        <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1, type: 'spring', stiffness: 300, damping: 20 }}
        >
            <motion.button
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 overflow-hidden group"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

            {/* Icon with sparkle effect */}
            <div className="relative z-10 flex items-center justify-center">
                <HiOutlineSparkles
                className="absolute w-4 h-4 text-yellow-300 animate-ping"
                style={{ top: '4px', right: '4px' }}
                />
                <FiMessageCircle size={26} className="drop-shadow-sm" />
            </div>
            </motion.button>

            {/* Enhanced Notification Badge */}
            {!isOpen && (
            <motion.div
                className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.8, type: 'spring', stiffness: 400 }}
            >
                <motion.span
                className="text-white text-sm font-bold"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                🛍️
                </motion.span>
            </motion.div>
            )}
        </motion.div>
        {/* Chat Modal */}
        <AnimatePresence>
            {isOpen && (
            <motion.div
                className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Backdrop */}
                <div
                className="absolute inset-0 bg-black bg-opacity-20"
                onClick={() => setIsOpen(false)}
                />

                {/* Chat Window */}
                <motion.div
                className="relative w-full max-w-md h-96 md:h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                initial={{ x: 400, y: 100, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                exit={{ x: 400, y: 100, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                {' '}
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <FiShoppingBag size={16} />
                    </div>
                    <div>
                        <h3 className="font-semibold">Hanouti Assistant</h3>
                        <p className="text-xs opacity-90">
                        {process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
                            ? 'Online'
                            : 'Limited mode'}
                        </p>
                    </div>
                    </div>
                    <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    >
                    <FiX size={20} />
                    </button>
                </div>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex gap-2 ${
                        message.sender === 'user'
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                    >
                        {' '}
                        {message.sender === 'bot' && (
                        <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <FiShoppingBag size={14} className="text-white" />
                        </div>
                        )}
                        <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                            message.sender === 'user'
                            ? 'bg-red-600 text-white rounded-br-md'
                            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm'
                        }`}
                        >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p
                            className={`text-xs mt-1 ${
                            message.sender === 'user'
                                ? 'text-red-100'
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
                        <div className="w-7 h-7 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                            <FiUser size={14} className="text-white" />
                        </div>
                        )}
                    </div>
                    ))}{' '}
                    {isLoading && (
                    <div className="flex gap-2 justify-start">
                        <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiShoppingBag size={14} className="text-white" />
                        </div>
                        <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-md shadow-sm">
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.1s' }}
                            ></div>
                            <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.2s' }}
                            ></div>
                        </div>
                        </div>
                    </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                {/* Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className="w-10 h-10 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        <FiSend size={16} />
                    </button>
                    </div>
                </div>
                </motion.div>
            </motion.div>
            )}
        </AnimatePresence>
        </>
    )
    }
