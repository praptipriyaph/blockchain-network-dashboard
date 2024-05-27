
import './App.css'
import GanacheInfo from './components/GanacheInfo'
import Data from './components/Data'
import './css/styles.css';
import {Routes, Route} from 'react-router-dom'

function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<GanacheInfo/>}/>
      <Route path="/data" element={<Data/>}/>
    </Routes>
    </>
  )
}

export default App
