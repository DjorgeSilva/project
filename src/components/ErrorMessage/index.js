// @flow

import React from 'react'
import styles from './styles.module.css'

type ErrorMessagePropTypes = {
  children: any
}

export default ({ children }: ErrorMessagePropTypes): React$Element<*> => {
  return <div className={styles.errorMessageContainer}>{children}</div>
}
