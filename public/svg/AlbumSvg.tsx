import { SVGProps } from "react";
export const AlbumSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="svg-icon"
    style={{
      width: "50px",
      height: "50px",
      verticalAlign: "middle",
      fill: "currentColor",
      overflow: "hidden",
    }}
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path d="M341.333 256H768v426.667h85.333v-512h-512V256zM256 256V85.333h682.667V768H768v170.667H85.333V256H256zm-85.333 597.333h512v-512h-512v512z" />
  </svg>
);
