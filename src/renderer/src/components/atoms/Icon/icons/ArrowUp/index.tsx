const ArrowUp = (): JSX.Element => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1291_2960)">
        <rect x="1" y="1" width="28" height="28" rx="6" fill="#2D303E" />
        <rect x="1.5" y="1.5" width="27" height="27" rx="5.5" stroke="#42455A" />
        <path
          d="M20.3697 13.195L15.7626 8.79333C15.6631 8.70002 15.5447 8.62625 15.4143 8.57634C15.1529 8.47523 14.8594 8.47523 14.598 8.57634C14.4676 8.62625 14.3492 8.70002 14.2497 8.79333L9.63028 13.2071C9.43566 13.3957 9.32797 13.6483 9.3304 13.9105C9.33284 14.1727 9.4452 14.4235 9.6433 14.6089C9.84139 14.7943 10.1094 14.8995 10.3895 14.9018C10.6696 14.904 10.9395 14.8032 11.141 14.6211L13.9388 11.9142L13.9388 20.4995C13.9388 20.7647 14.0514 21.0191 14.2517 21.2066C14.4521 21.3941 14.7238 21.4995 15.0072 21.4995C15.2906 21.4995 15.5623 21.3941 15.7627 21.2066C15.9631 21.0191 16.0756 20.7647 16.0756 20.4995V11.9142L18.859 14.6089C19.0605 14.7911 19.3304 14.8918 19.6105 14.8896C19.8906 14.8873 20.1586 14.7821 20.3567 14.5967C20.5548 14.4113 20.6672 14.1605 20.6696 13.8983C20.672 13.6362 20.5643 13.3836 20.3697 13.195Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1291_2960"
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
            result="effect1_dropShadow_1291_2960"
          />
          <feOffset />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0666667 0 0 0 0 0.0705882 0 0 0 0 0.0941176 0 0 0 0.3 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1291_2960" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1291_2960"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default ArrowUp
