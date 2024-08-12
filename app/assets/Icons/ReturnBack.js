import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ReturnBack = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M20 10.5a6.5 6.5 0 0 1-6.5 6.5H7.83l3.09 3.09L9.5 21.5 4 16l5.5-5.5 1.41 1.41L7.83 15h5.67c2.5 0 4.5-2 4.5-4.5S16 6 13.5 6H6V4h7.5a6.5 6.5 0 0 1 6.5 6.5Z"
    />
  </Svg>
)
export default ReturnBack
