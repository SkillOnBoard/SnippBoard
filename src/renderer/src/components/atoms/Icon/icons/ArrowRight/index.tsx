const ArrowRight = (): JSX.Element => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1437_4125)">
        <rect x="1" y="1" width="28" height="28" rx="6" fill="#2D303E" />
        <rect x="1.5" y="1.5" width="27" height="27" rx="5.5" stroke="#42455A" />
        <path
          d="M16.805 20.3697L21.2067 15.7626C21.3 15.6631 21.3738 15.5447 21.4237 15.4143C21.5248 15.1529 21.5248 14.8594 21.4237 14.598C21.3738 14.4676 21.3 14.3492 21.2067 14.2497L16.7929 9.63028C16.6043 9.43566 16.3517 9.32797 16.0895 9.3304C15.8273 9.33284 15.5765 9.4452 15.3911 9.6433C15.2057 9.84139 15.1005 10.1094 15.0983 10.3895C15.096 10.6696 15.1968 10.9395 15.3789 11.141L18.0858 13.9388L9.50047 13.9388C9.23527 13.9388 8.98092 14.0514 8.79339 14.2517C8.60587 14.4521 8.50051 14.7238 8.50051 15.0072C8.50051 15.2906 8.60587 15.5623 8.79339 15.7627C8.98092 15.9631 9.23527 16.0756 9.50047 16.0756L18.0858 16.0756L15.3911 18.859C15.2089 19.0605 15.1082 19.3304 15.1104 19.6105C15.1127 19.8906 15.2179 20.1586 15.4033 20.3567C15.5887 20.5548 15.8395 20.6672 16.1017 20.6696C16.3639 20.672 16.6164 20.5643 16.805 20.3697Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1437_4125"
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
            result="effect1_dropShadow_1437_4125"
          />
          <feOffset />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0666667 0 0 0 0 0.0705882 0 0 0 0 0.0941176 0 0 0 0.3 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1437_4125" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1437_4125"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default ArrowRight
