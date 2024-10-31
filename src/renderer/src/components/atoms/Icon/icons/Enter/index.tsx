const Enter = (): JSX.Element => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1291_2957)">
        <rect x="1" y="1" width="28" height="28" rx="6" fill="#2D303E" />
        <rect x="1.5" y="1.5" width="27" height="27" rx="5.5" stroke="#42455A" />
      </g>
      <path
        d="M21 9C20.448 9 20 9.448 20 10V16.5003H10.4128L11.7057 15.2073C12.0967 14.8163 12.0967 14.1842 11.7057 13.7933C11.3148 13.4023 10.6828 13.4023 10.2918 13.7933L7.29175 16.7933C7.19975 16.8853 7.12675 16.9963 7.07575 17.1183C6.97475 17.3633 6.97475 17.6383 7.07575 17.8823C7.12675 18.0043 7.19975 18.1153 7.29175 18.2073L10.2918 21.2073C10.4868 21.4023 10.7428 21.5003 10.9988 21.5003C11.2548 21.5003 11.5107 21.4023 11.7057 21.2073C12.0967 20.8163 12.0967 20.1842 11.7057 19.7933L10.4128 18.5003H21C21.552 18.5003 22 18.0523 22 17.5003V10C22 9.448 21.552 9 21 9Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_d_1291_2957"
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
            result="effect1_dropShadow_1291_2957"
          />
          <feOffset />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0666667 0 0 0 0 0.0705882 0 0 0 0 0.0941176 0 0 0 0.3 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1291_2957" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1291_2957"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default Enter
