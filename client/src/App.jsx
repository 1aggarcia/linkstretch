import { useState } from 'react'
import Start from './components/Start'
import Processser from './components/Processer';
import './assets/style.css'
import Footer from './components/Footer';

export default function App() {
  return (
    <div className='app centered'>
      <h1 style={{margin: "8px 0px"}}>LinkStretch</h1>
      <WindowContainer />
      <Footer />
    </div>
  )
}

function WindowContainer() {
  const [link, setLink] = useState('');

  if (link.length === 0) {
    return <Start generate={setLink} />
  } else {
    return <Processser link={link} startOver={() => setLink('')} />
  }
}
