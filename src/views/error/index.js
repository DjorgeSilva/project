// @flow

import React from 'react'
import styles from './styles.module.css'

export default (): React$Element<*> => {
  return (
    <div className={styles.errorViewContainer}>
      <h2>Error</h2>
    </div>
  )
}
