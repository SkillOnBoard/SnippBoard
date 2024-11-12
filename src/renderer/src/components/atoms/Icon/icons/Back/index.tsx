const Back = (): JSX.Element => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1437_3333)">
        <rect x="1" y="1" width="28" height="28" rx="6" fill="#2D303E" />
        <rect x="1.5" y="1.5" width="27" height="27" rx="5.5" stroke="#42455A" />
        <path
          d="M21.5 14.0001C21 14.0001 10.9128 14.0001 10.9128 14.0001L12.2057 12.7071C12.5967 12.3161 12.5967 11.6841 12.2057 11.2931C11.8148 10.9021 11.1828 10.9021 10.7918 11.2931L7.79175 14.2931C7.69975 14.3851 7.62675 14.4961 7.57575 14.6181C7.47475 14.8631 7.47475 15.1381 7.57575 15.3821C7.62675 15.5041 7.69975 15.6151 7.79175 15.7071L10.7918 18.7071C10.9868 18.9021 11.2428 19.0001 11.4988 19.0001C11.7548 19.0001 12.0107 18.9021 12.2057 18.7071C12.5967 18.3161 12.5967 17.6841 12.2057 17.2931L10.9128 16.0001H21.5C22.052 16.0001 22.5 15.5521 22.5 15.0001C22.5 14.4481 22.05 14.0001 21.5 14.0001Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1437_3333"
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
            result="effect1_dropShadow_1437_3333"
          />
          <feOffset />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0666667 0 0 0 0 0.0705882 0 0 0 0 0.0941176 0 0 0 0.3 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1437_3333" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1437_3333"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default Back
