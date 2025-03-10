const KeyE = (): JSX.Element => {
  return (
    <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1_6)">
        <rect x="1" y="1" width="27" height="28" rx="6" fill="#2D303E" />
        <rect x="1.5" y="1.5" width="26" height="27" rx="5.5" stroke="#42455A" />
        <path
          d="M10.1378 21.5V8.40909H18.9588V10.6911H12.9055V13.8104H18.505V16.0923H12.9055V19.218H18.9844V21.5H10.1378Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1_6"
          x="0"
          y="0"
          width="29"
          height="30"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow_1_6"
          />
          <feOffset />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0666667 0 0 0 0 0.0705882 0 0 0 0 0.0941176 0 0 0 0.3 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_6" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_6" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

export default KeyE
