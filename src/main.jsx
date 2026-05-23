import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ConcertWrapper } from './contexts/concertapi.context.jsx'
import { AuthWrapper } from './contexts/auth.context.jsx'

import "./utilities/fixLeafletIcons.js"
import "leaflet/dist/leaflet.css"


createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <ConcertWrapper>
        <AuthWrapper>
    <App />
    </AuthWrapper>
    </ConcertWrapper>
    
    </BrowserRouter>

)
