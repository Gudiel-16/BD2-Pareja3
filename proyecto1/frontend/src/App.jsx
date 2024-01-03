import { useState } from 'react'
import  AppRouter  from './router/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import Apptheme from './theme/Apptheme';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


function App() {

  return (
    <>
    <Apptheme>
       <AppRouter/>
    </Apptheme>
    </>
  )
}

export default App
