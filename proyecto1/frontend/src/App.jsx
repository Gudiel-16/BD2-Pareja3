import { useState } from 'react'
import  AppRouter  from './router/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import Apptheme from './theme/Apptheme';

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
