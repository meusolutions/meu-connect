import React, { useState, useEffect } from 'react'
import AppNavigation from './navigation/AppNavigation'
function Main() {
    //TODO: Check whether user is admin or normal user
    const [isLogged, setIsLogged] = useState(null)

    return <AppNavigation isLogged={isLogged}></AppNavigation>
}
export default Main
