const KeyN = (): JSX.Element => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1_2)">
        <rect x="1" y="1" width="28" height="28" rx="6" fill="#2D303E" />
        <rect x="1.5" y="1.5" width="27" height="27" rx="5.5" stroke="#42455A" />
        <path
          d="M20.5874 8.40909V21.5H18.1967L12.5014 13.2607H12.4055V21.5H9.63778V8.40909H12.0668L17.7173 16.642H17.8324V8.40909H20.5874Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1_2"
          x="0"
          y="0"
          width="30"
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
            result="effect1_dropShadow_1_2"
          />
          <feOffset />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0666667 0 0 0 0 0.0705882 0 0 0 0 0.0941176 0 0 0 0.3 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_2" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

export default KeyN
