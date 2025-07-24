import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TunisianShop E-commerce API',
      version: '1.0.0',
      description:
        'A comprehensive e-commerce API for TunisiaShop with authentication, product management, cart, and order processing',
      contact: {
        name: 'API Support',
        email: 'ammar.mohamdamine@gmail.com',
      },
    },
    servers: [
      {
        url: process.env.BACKEND_URL || 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            mobile: { type: 'string' },
            avatar: { type: 'string' },
            role: { type: 'string', enum: ['ADMIN', 'USER'] },
            status: {
              type: 'string',
              enum: ['Active', 'Inactive', 'Suspended'],
            },
            address_details: {
              type: 'array',
              items: { $ref: '#/components/schemas/Address' },
            },
            shopping_cart: {
              type: 'array',
              items: { $ref: '#/components/schemas/CartItem' },
            },
            orderHistory: { type: 'array', items: { type: 'string' } },
          },
        },
        Product: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            image: { type: 'array', items: { type: 'string' } },
            category: { type: 'array', items: { type: 'string' } },
            subCategory: { type: 'array', items: { type: 'string' } },
            unit: { type: 'string' },
            stock: { type: 'number' },
            price: { type: 'number' },
            discount: { type: 'number' },
            description: { type: 'string' },
            more_details: { type: 'object' },
            publish: { type: 'boolean' },
          },
        },
        Category: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            image: { type: 'string' },
          },
        },
        SubCategory: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            image: { type: 'string' },
            category: { type: 'array', items: { type: 'string' } },
          },
        },
        CartItem: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            productId: { $ref: '#/components/schemas/Product' },
            quantity: { type: 'number' },
          },
        },
        Address: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            address_line: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            pincode: { type: 'string' },
            country: { type: 'string' },
            mobile: { type: 'string' },
          },
        },
        Order: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            orderId: { type: 'string' },
            userId: { type: 'string' },
            orderStatus: { type: 'string' },
            paymentId: { type: 'string' },
            payment_status: { type: 'string' },
            delivery_address: { $ref: '#/components/schemas/Address' },
            subTotalAmt: { type: 'number' },
            totalAmt: { type: 'number' },
            invoice_receipt: { type: 'string' },
            product_details: { type: 'array' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            error: { type: 'string' },
          },
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string' },
            data: { type: 'object' },
          },
        },
      },
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and authorization endpoints',
      },
      {
        name: 'Products',
        description: 'Product management and search endpoints',
      },
      {
        name: 'Categories',
        description: 'Product category management',
      },
      {
        name: 'Subcategories',
        description: 'Product subcategory management',
      },
      {
        name: 'Cart',
        description: 'Shopping cart management',
      },
      {
        name: 'Orders',
        description: 'Order processing and management',
      },
      {
        name: 'Address',
        description: 'User address management',
      },
      {
        name: 'Upload',
        description: 'File upload endpoints',
      },
    ],
  },
  apis: ['./routes/*.js', './index.js'],
}

const specs = swaggerJSDoc(options)

export { specs, swaggerUi }
