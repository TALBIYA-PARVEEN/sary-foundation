import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#071916] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#0B2722] border border-emerald-800/80 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] p-1.5 mx-auto flex items-center justify-center border-2 border-emerald-400/40">
              <img src="/sary-logo.png" alt="SARY Foundation" className="w-full h-full object-contain rounded-xl" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">SARY Foundation</h2>
              <p className="text-xs text-emerald-300 font-semibold uppercase tracking-widest">Portal Notice</p>
              <p className="text-sm text-gray-300 pt-2 leading-relaxed">
                The application encountered a temporary display state. Please click below to reload cleanly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="eco-gradient-btn text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
              >
                Reload Page
              </button>
              <a
                href="/sary-portal"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 px-6 rounded-xl text-xs border border-white/15 transition flex items-center justify-center"
              >
                Admin Login
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
