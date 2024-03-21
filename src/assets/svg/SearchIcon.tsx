type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export default function SearchIcon({ width, height, color }: Props) {
  return (
    <svg
      width={width}
      height={height}
      className={color}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
  );
}
