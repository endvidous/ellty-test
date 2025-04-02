export const CheckIcon = ({
  className,
  color,
}: {
  className: string;
  color: string;
}) => {
  return (
    <div className={className}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 12.6111L8.92308 17.5L20 6.5"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};
