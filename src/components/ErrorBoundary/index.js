// @flow

import React from 'react'
import useTranslation from '@atomos/atomizer-utils/hooks/useTranslation'
import styles from './styles.module.css'
import Button from '@atomos/atomix/molecules/Button'

type ErrorOutputPropTypes = {
  titleTranslationKey: string,
  messageTranslationKey: string,
  tryAgainOnClick: () => void
}

function ErrorOutput({
  titleTranslationKey,
  messageTranslationKey,
  tryAgainOnClick
}: ErrorOutputPropTypes): React$Element<*> {
  const { translate } = useTranslation('global')

  return (
    <div className={styles.errorBoundaryContainer}>
      <h1>{translate(titleTranslationKey)}</h1>
      <p>{translate(messageTranslationKey)}</p>
      <div className={styles.tryAgainBtnWrapper}>
        <Button label="Try Again" onClick={tryAgainOnClick} />
      </div>
    </div>
  )
}

type ErrorBoundaryPropTypes = {
  children?: any,
  // For things like error view to override
  hasError?: boolean,
  titleTranslationKey?: string,
  messageTranslationKey?: string
}

type StateType = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryPropTypes, StateType> {
  constructor(props: ErrorBoundaryPropTypes): void {
    super(props)

    this.state = { hasError: false }
  }

  /* eslint-disable handle-callback-err */
  static getDerivedStateFromError(error: Error): { hasError: boolean } {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: any): void {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.error(error, errorInfo)
  }

  render(): React$Element<*> | null {
    if (this.state.hasError || this.props.hasError) {
      return (
        <ErrorOutput
          titleTranslationKey={
            this.props.titleTranslationKey || 'error-boundary-default-title'
          }
          messageTranslationKey={
            this.props.messageTranslationKey || 'error-boundary-default-msg'
          }
          tryAgainOnClick={() =>
            this.setState({
              hasError: false
            })
          }
        />
      )
    }

    return this.props.children || null
  }
}

export default ErrorBoundary
