type Props = {
  width?: number;
  height?: number;
};

const DeleteIcon = ({ width, height }: Props) => {
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 8V21H3V8"
          stroke="#252525"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23 3H1V8H23V3Z"
          stroke="#252525"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 12H14"
          stroke="#252525"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default DeleteIcon;
