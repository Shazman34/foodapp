import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
    return (
        <div className='app-download' id='app-download'>
            <p>For Better Experience Download <br />Hunger Bells</p>
            <div className="app-download-platforms">
                <img className='download-image download-image1' src={assets.play_store} alt="" />
                <img className='download-image download-image2' src={assets.app_store} alt="" />
            </div>
        </div>
    )
}

export default AppDownload
