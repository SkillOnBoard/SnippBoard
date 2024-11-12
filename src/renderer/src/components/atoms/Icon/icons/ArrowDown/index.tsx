const ArrowDown = (): JSX.Element => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1291_2956)">
        <rect x="1" y="1" width="28" height="28" rx="6" fill="#2D303E" />
        <rect x="1.5" y="1.5" width="27" height="27" rx="5.5" stroke="#42455A" />
        <path
          d="M9.63028 16.805L14.2374 21.2067C14.3369 21.3 14.4553 21.3738 14.5857 21.4237C14.8471 21.5248 15.1406 21.5248 15.402 21.4237C15.5324 21.3738 15.6508 21.3 15.7503 21.2067L20.3697 16.7928C20.5643 16.6043 20.672 16.3517 20.6696 16.0895C20.6672 15.8273 20.5548 15.5765 20.3567 15.3911C20.1586 15.2057 19.8906 15.1005 19.6105 15.0982C19.3304 15.096 19.0605 15.1968 18.859 15.3789L16.0612 18.0858L16.0612 9.50046C16.0612 9.23526 15.9486 8.98092 15.7483 8.79339C15.5479 8.60586 15.2762 8.50051 14.9928 8.50051C14.7094 8.50051 14.4377 8.60586 14.2373 8.79339C14.0369 8.98092 13.9244 9.23526 13.9244 9.50046L13.9244 18.0858L11.141 15.3911C10.9395 15.2089 10.6696 15.1081 10.3895 15.1104C10.1094 15.1127 9.84139 15.2179 9.6433 15.4033C9.4452 15.5887 9.33284 15.8395 9.3304 16.1017C9.32797 16.3638 9.43566 16.6164 9.63028 16.805Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1291_2956"
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
            result="effect1_dropShadow_1291_2956"
          />
          <feOffset />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0666667 0 0 0 0 0.0705882 0 0 0 0 0.0941176 0 0 0 0.3 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1291_2956" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1291_2956"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default ArrowDown
