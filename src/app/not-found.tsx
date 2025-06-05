import { NextResponse } from 'next/server'

export default function NotFound() {
  return (
    <html>
      <head>
        <title>Page Not Found | Sherif Alghali</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </head>
      <body>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div>
            <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0' }}>Page Not Found</h2>
            <p style={{ margin: '0 0 2rem 0' }}>
              The page you're looking for doesn't exist.
            </p>
            <a 
              href="/" 
              style={{ 
                color: '#0a66c2', 
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                border: '1px solid #0a66c2',
                borderRadius: '4px'
              }}
            >
              Go Home
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
