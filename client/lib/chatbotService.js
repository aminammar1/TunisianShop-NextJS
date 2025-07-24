import { ChatOpenAI } from '@langchain/openai'
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts'
import {
  RunnableSequence,
  RunnablePassthrough,
} from '@langchain/core/runnables'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { AIMessage, HumanMessage } from '@langchain/core/messages'

class ChatbotService {
  constructor() {
    this.model = null
    this.chain = null
    this.conversationHistory = []
    this.initializeChain()
  }

  initializeChain() {
    try {
      // Initialize the OpenAI model with OpenRouter configuration
      this.model = new ChatOpenAI({
        model: 'openai/gpt-4o',
        temperature: 0.7,
        maxTokens: 200,
        apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
        configuration: {
          baseURL: 'https://openrouter.ai/api/v1',
          defaultHeaders: {
            'HTTP-Referer':
              process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
            'X-Title': process.env.NEXT_PUBLIC_SITE_NAME || 'Hanouti Store',
          },
        },
      })

      // Create the prompt template with Tunisian context
      const prompt = ChatPromptTemplate.fromMessages([
        [
          'system',
          `You are a professional shopping assistant for Hanouti Store, an e-commerce platform in Tunisia. You are fluent in English, French, and Arabic.

Your main responsibilities:
- Help customers find products and categories
- Answer questions about orders, shipping, and payment
- Provide information about store policies
- Assist in choosing suitable products
- Handle inquiries in a friendly and professional manner

Service features:
- Free delivery throughout Tunisia
- Cash on delivery available
- Return and exchange policy
- 24/7 customer service
- High-quality local and international products

Response guidelines:
- Start with "Yes" or "No" for direct questions
- Be concise (under 120 words)
- Speak in a friendly and professional tone
- Provide practical and actionable solutions
- Maintain professional customer service standards

Remember: You represent Hanouti Store Tunisia, be proud of the quality and excellent service.`,
        ],
        new MessagesPlaceholder('chat_history'),
        ['human', '{input}'],
      ])

      // Create the chain with proper LangChain runnable composition
      this.chain = RunnableSequence.from([
        {
          input: new RunnablePassthrough(),
          chat_history: () => this.conversationHistory.slice(-8), // Keep last 8 messages
        },
        prompt,
        this.model,
        new StringOutputParser(),
      ])
    } catch (error) {
      console.error('Error initializing chatbot service:', error)
      this.model = null
      this.chain = null
    }
  }

  async sendMessage(message) {
    try {
      if (!this.chain || !this.model) {
        throw new Error('Chatbot service not properly initialized')
      }

      // Add user message to history
      this.conversationHistory.push(new HumanMessage(message))

      // Get response from LangChain
      const response = await this.chain.invoke({
        input: message,
        chat_history: this.conversationHistory.slice(-8), // Keep last 8 messages
      })

      // Add AI response to history
      this.conversationHistory.push(new AIMessage(response))

      return response
    } catch (error) {
      console.error('Error in chatbot service:', error)
      // Fallback responses for different error cases
      if (error.response?.status === 402 || error.response?.status === 429) {
        return this.getFallbackResponse(message)
      } else if (error.code === 'NETWORK_ERROR' || !navigator.onLine) {
        return this.getFallbackResponse(message)
      }
      throw error
    }
  }

  getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase()

    // English responses for common queries
    if (
      lowerMessage.includes('delivery') ||
      lowerMessage.includes('shipping') ||
      lowerMessage.includes('ship')
    ) {
      return 'Yes, we offer free delivery throughout Tunisia. Your order will be delivered to your doorstep at no additional cost.'
    }

    if (
      lowerMessage.includes('payment') ||
      lowerMessage.includes('cash') ||
      lowerMessage.includes('pay')
    ) {
      return 'Yes, we accept cash on delivery and online payment via credit cards. Choose the method that suits you best.'
    }

    if (
      lowerMessage.includes('return') ||
      lowerMessage.includes('exchange') ||
      lowerMessage.includes('refund')
    ) {
      return 'Yes, we have a flexible return and exchange policy. You can return products within a specified period according to our terms.'
    }

    if (
      lowerMessage.includes('product') ||
      lowerMessage.includes('item') ||
      lowerMessage.includes('buy')
    ) {
      return 'You can browse our products through the main menu or use the search feature. Our products are categorized for easy browsing.'
    }

    if (
      lowerMessage.includes('help') ||
      lowerMessage.includes('support') ||
      lowerMessage.includes('contact')
    ) {
      return 'Our customer service team is available 24/7 to help you. You can contact us through the form on our website.'
    }

    if (
      lowerMessage.includes('hello') ||
      lowerMessage.includes('hi') ||
      lowerMessage.includes('hey')
    ) {
      return 'Hello! Welcome to Hanouti Store, your favorite online store in Tunisia. How can I help you today?'
    }

    return 'Welcome to Hanouti Store! I am here to help you find the best products and answer your questions. How can I assist you today?'
  }

  clearHistory() {
    this.conversationHistory = []
  }

  async getConversationSummary() {
    return this.conversationHistory.length > 0
      ? `Conversation has ${this.conversationHistory.length} messages`
      : 'No conversation history'
  }

  getWelcomeMessage() {
    const hour = new Date().getHours()
    let greeting = 'Hello'

    if (hour < 12) greeting = 'Good morning'
    else if (hour < 18) greeting = 'Good afternoon'
    else greeting = 'Good evening'

    return `${greeting}! Welcome to Hanouti Store, your favorite online store in Tunisia! I am here to help you find the best products and answer all your inquiries. How can I assist you today?`
  }
}

export default new ChatbotService()
