import * as React from "react"
import { SVGProps } from "react"
export const AddMembersSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="svg-icon"
    style={{
      width: "1em",
      height: "1em",
      verticalAlign: "middle",
      fill: "currentColor",
      overflow: "hidden",
    }}
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path d="M160 704c-35.2 0-64 28.8-64 64v41.6c0 12.8 9.6 22.4 22.4 22.4h595.2c12.8 0 22.4-9.6 22.4-22.4V768c0-35.2-28.8-64-64-64H160zm704-224h96c19.2 0 32 12.8 32 32s-12.8 32-32 32h-96v96c0 19.2-12.8 32-32 32s-32-12.8-32-32v-96h-96c-19.2 0-32-12.8-32-32s12.8-32 32-32h96v-96c0-19.2 12.8-32 32-32s32 12.8 32 32v96zM160 640h512c70.4 0 128 57.6 128 128v41.6c0 48-38.4 86.4-86.4 86.4H118.4c-48 0-86.4-38.4-86.4-86.4V768c0-70.4 57.6-128 128-128zm176-448c-25.6 0-48 22.4-48 48v144c0 70.4 57.6 128 128 128s128-57.6 128-128V240c0-25.6-22.4-48-48-48H336zm0-64h156.8c64 0 112 51.2 112 112v144c0 105.6-86.4 192-192 192s-192-86.4-192-192V240c3.2-60.8 54.4-112 115.2-112z" />
  </svg>
)