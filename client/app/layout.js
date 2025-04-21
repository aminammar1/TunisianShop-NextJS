'use client'

import '../styles/globals.css'
import Header from '@/components/header/Header'
import { Toaster } from 'react-hot-toast'
import { store, persistor } from '@/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import GlobalProvider from '@/providers/GlobalProvider'
import ProgressBar from '@/components/Progress'
import { useEffect, Suspense } from 'react'
import { useDispatch } from 'react-redux'
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from '@/store/ProductSlice'
import GlobalApi from '@/api/GlobalApi'
import Axios from '@/lib/Axios'

function Initializer() {
  const dispatch = useDispatch()

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...GlobalApi.GetCategories,
      })
      const { data: responseData } = response

      if (responseData.success) {
        dispatch(
          setAllCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        )
      }
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...GlobalApi.GetSubCategories,
      })
      const { data: responseData } = response

      if (responseData.success) {
        dispatch(
          setAllSubCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCategory()
    fetchSubCategory()
  }, [])

  return null
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Hanouti TN</title>
        <meta name="description" content="Description" />
      </head>
      <body>
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GlobalProvider>
              <Initializer /> {/* Moved useEffect logic here */}
              <Header />
              <main className="min-h-[78vh]">{children}</main>
              <Toaster />
            </GlobalProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
