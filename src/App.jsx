import './App.css'
import CampaignList from './components/CampaignList'
import HeaderComponent from './components/HeaderComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CampaignComponent from './components/CampaignComponent'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            <Route path="/" element={<CampaignList />} />
            <Route path="/campaigns" element={<CampaignList />} />
            <Route path="/campaigns/add" element={<CampaignComponent />} />
            <Route path="/campaigns/update/:id" element={<CampaignComponent />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
