export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '24px 0',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span className="label">Chenyu Pan — {new Date().getFullYear()}</span>
        <span className="label">Designed & built by hand</span>
      </div>
    </footer>
  )
}
