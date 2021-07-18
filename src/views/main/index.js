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

// store imports
import useRootStore from "../../hooks/useRootStore"
// =================================================================

// =================================================================
// Windows Types Definitions

type RequiredPropTypes = {}
type OptionalPropTypes = {}

export type PropTypes = RequiredPropTypes & OptionalPropTypes

// =================================================================

const MainView = (props: PropTypes): React$Element<*> => {

  // const [, openWindow] = useIpc('windowController', 'open-window', false)

  // useEffect(()=>{

  //   openWindow({message: 'mainWindow'})
  // },[])


  return (
    <div className={styles.homeViewContainer}>
      <h1 className="txt">Main</h1>
    </div>
  )
}

export default memo<PropTypes>(MainView, isEqual)