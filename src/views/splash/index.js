// @flow


// =================================================================
// general imports
import React, {useEffect, memo} from 'react'
import { isEqual } from 'lodash-es'
import useIpc from "@atomos/atomizer-desktop/client/hooks/useIpc"
// =================================================================

// =================================================================
// style imports
import styles from './styles.module.css'

// =================================================================

// =================================================================
// Types imports
import type {RootStoreType} from '../../stores/root'

// =================================================================

// assets imports
import splashLogo from "../../assets/images/splashLogo.png"
// =================================================================

// =================================================================
// store imports
import useRootStore from "../../hooks/useRootStore"
// =================================================================

// =================================================================
// Windows defaults values
const DISPLAY_TIME = 3000
// =================================================================

// =================================================================
// Windows Types Definitions

type RequiredPropTypes = {}
type OptionalPropTypes = {}

export type PropTypes = RequiredPropTypes & OptionalPropTypes

// =================================================================

const SplashView = (props: PropTypes): React$Element<*> => {

  const [, openWindow] = useIpc('windowController', 'open-window', false)
  const [, hideWindow] = useIpc('windowController', 'hide-window', false)

  // mobx store
  const rootStore: RootStoreType = useRootStore()
  const loadTasks = rootStore.loadAllTasks
  const version = rootStore.version

  useEffect(() => {

    setTimeout(()=>{
      console.log('Executing timeout')
      hideWindow({message: 'splashWindow'})
      openWindow({message: 'mainWindow'})
    
      }, DISPLAY_TIME)

    },[openWindow, hideWindow])
      
      console.log('Faking loading tasks')
      loadTasks()


      return ( 
    <div className = { styles.splashViewContainer} >

      <div className={styles.logo}>
        <img src={splashLogo} alt='logo'/>
      </div>

      <div className={styles.version}>
        <p>{`Version ${version} by Firefly & Friends` }</p>
      </div>

    </div>
  )

}


export default memo<PropTypes>(SplashView, isEqual)