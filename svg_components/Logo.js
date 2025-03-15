const Logo = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="100"
      cy="100"
      r="80"
      stroke="url(#grad1)"
      stroke-width="10"
      fill="none"
    />
    <path
      d="M60 90 Q100 40, 140 90"
      stroke="url(#grad1)"
      strokeWidth="8"
      fill="none"
      stroke-linecap="round"
    />
    <circle cx="60" cy="90" r="6" fill="url(#grad1)" />
    <circle cx="140" cy="90" r="6" fill="url(#grad1)" />
    <circle cx="100" cy="130" r="8" fill="url(#grad1)" />
    <defs>
      <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#4A90E2" />
        <stop offset="100%" stop-color="#9013FE" />
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;
