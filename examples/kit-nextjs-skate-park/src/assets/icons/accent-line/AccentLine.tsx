const AccentLine = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 441 25"
      fill="none"
      className={`block w-[7ch] h-[0.5em] max-w-full mt-1 group-[.text-center]/heading:mx-auto group-[.text-right]/heading:ml-auto ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M3 22C93.4059 7.66215 306.974 -12.4108 438 22"
        stroke="var(--color-accent)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AccentLine;
