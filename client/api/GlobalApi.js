export const baseURL = process.env.NEXT_PUBLIC_API_URL

const GlobalApi = {
  signup: {
    url: '/api/user/signup',
    method: 'post',
  },
  verifyEmail: {
    url: '/api/user/verify-email',
    method: 'post',
  },
  signin: {
    url: '/api/user/signin',
    method: 'post',
  },
  signout: {
    url: '/api/user/signout',
    method: 'get',
  },
  forgotPassword: {
    url: '/api/user/forget-password',
    method: 'post',
  },
  verifyOtp: {
    url: '/api/user/verify-otp',
    method: 'post',
  },
  resetPassword: {
    url: '/api/user/reset-password',
    method: 'put',
  },
  refreshToken: {
    url: '/api/user/refresh-token',
    method: 'post',
  },
  userDetails: {
    url: '/api/user/user-details',
    method: 'get',
  },
  uploadAvatar: {
    url: '/api/user/upload-avatar',
    method: 'put',
  },
  updateProfilUser: {
    url: '/api/user/update-user',
    method: 'put',
  },
  googleAuth: {
    url: '/api/user/google-auth',
    method: 'post',
  },
  UploadImage: {
    url: '/api/upload/upload-image',
    method: 'post',
  },
  AddCategory: {
    url: '/api/category/add-category',
    method: 'post',
  },
  GetCategories: {
    url: '/api/category/get-categories',
    method: 'get',
  },
  updateCategory: {
    url: '/api/category/update-category',
    method: 'put',
  },
  deleteCategory: {
    url: '/api/category/delete-category',
    method: 'delete',
  },
  AddSubCategory: {
    url: '/api/subCategory/create-subCategory',
    method: 'post',
  },
  GetSubCategories: {
    url: '/api/subCategory/get-subCategories',
    method: 'get',
  },
  updateSubCategory: {
    url: '/api/subCategory/update-subCategory',
    method: 'put',
  },
  deleteSubCategory: {
    url: '/api/subCategory/delete-subCategory',
    method: 'delete',
  },
  AddProduct: {
    url: '/api/product/create-product',
    method: 'post',
  },
  GetProducts: {
    url: '/api/product/get-products',
    method: 'get',
  },
  UpdateProducts: {
    url: '/api/product/update-product',
    method: 'put',
  },
  DeleteProduct: {
    url: '/api/product/delete-product',
    method: 'delete',
  },
  ProductByCategory: {
    url: '/api/product/products-by-category',
    method: 'get',
  },
  GetProductDetails: {
    url: '/api/product/productDetails',
    method: 'get',
  },
  GetProductByCategoryAndSubCategory: {
    url: '/api/product/products-by-categorAndSubCategory',
    method: 'get',
  },
  SearchProduct: {
    url: '/api/product/search-product',
    method: 'get',
  },
  AddToCart: {
    url: '/api/cart/add-cart',
    method: 'post',
  },
  GetCart: {
    url: '/api/cart/get-cart',
    method: 'get',
  },
  UpdateCart: {
    url: '/api/cart/update-cart',
    method: 'put',
  },
  DeleteCart: {
    url: '/api/cart/delete-cart',
    method: 'delete',
  },
}

export default GlobalApi
