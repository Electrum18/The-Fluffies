export default function OuterLink({ children, name, href, className }) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      title={name}
      rel="noopener noreferrer"
      aria-label={name}
    >
      {children}
    </a>
  )
}
