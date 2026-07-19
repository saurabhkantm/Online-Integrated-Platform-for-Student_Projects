import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-ledger-50 p-4">
          <div className="max-w-xl rounded-3xl border border-danger-100 bg-white p-8 text-center shadow-ledger">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-danger-600">Something went wrong</p>
            <h1 className="mt-4 text-3xl font-bold text-ledger-900">Application error</h1>
            <p className="mt-3 text-sm leading-6 text-ledger-500">
              An unexpected error occurred while loading the application. Please refresh the page or try again later.
            </p>
            <pre className="mt-6 max-h-44 overflow-auto rounded-2xl bg-ledger-50 p-4 text-left text-xs text-ledger-500">
              {String(this.state.error?.message ?? 'Unknown error')}
            </pre>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
