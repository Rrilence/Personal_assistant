import { Routes, Route } from "react-router-dom"
import ExpensesPage from './pages/ExpensesPage/ExpensesPage'
import Weather from './pages/Weather/Weather'
import Words from './pages/Words/Words'
import NotFound from './pages/NotFound'
import Layout from "./components/Layout/Layout"
import { ContextProvider } from "./helpers/context"

function App() {


  return (
    <>
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<ExpensesPage/>}/>
          <Route path="weather" element={<Weather/>}/>
          <Route path="words" element={<Words/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
      </ContextProvider>
    </>
  )
}

export default App
