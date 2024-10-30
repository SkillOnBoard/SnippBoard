const Command = (): JSX.Element => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1291_2779)">
        <rect x="1" y="1" width="28" height="28" rx="6" fill="#2D303E" />
        <rect x="1.5" y="1.5" width="27" height="27" rx="5.5" stroke="#42455A" />
        <path
          d="M11.2935 21.5C9.59551 21.5 8.5 20.4347 8.5 18.7736C8.5 17.0222 9.55899 15.9931 11.6404 15.9931H12.7177V14.0069H11.6404C9.55899 14.0069 8.5 12.9778 8.5 11.2264C8.5 9.56528 9.59551 8.5 11.2935 8.5C13.3385 8.5 13.9958 9.76389 13.9958 11.2806V12.7792H16.0042V11.2806C16.0042 9.76389 16.6615 8.5 18.7065 8.5C20.4045 8.5 21.5 9.56528 21.5 11.2264C21.5 12.9778 20.441 14.0069 18.3596 14.0069H17.2823V15.9931H18.3596C20.441 15.9931 21.5 17.0222 21.5 18.7736C21.5 20.4347 20.4045 21.5 18.7065 21.5C16.6615 21.5 16.0042 20.2361 16.0042 18.7194V17.2208H13.9958V18.7194C13.9958 20.2361 13.3385 21.5 11.2935 21.5ZM17.2823 11.2444V12.7792H18.3596C19.6559 12.7792 20.2037 12.2556 20.2037 11.2264C20.2037 10.1611 19.5646 9.74583 18.7065 9.74583C17.757 9.74583 17.2823 10.3236 17.2823 11.2444ZM11.6404 12.7792H12.7177V11.2444C12.7177 10.3236 12.243 9.74583 11.2935 9.74583C10.4354 9.74583 9.79635 10.1611 9.79635 11.2264C9.79635 12.2556 10.3441 12.7792 11.6404 12.7792ZM13.9958 15.9931H16.0042V14.0069H13.9958V15.9931ZM11.2935 20.2542C12.243 20.2542 12.7177 19.6764 12.7177 18.7556V17.2208H11.6404C10.3441 17.2208 9.79635 17.7444 9.79635 18.7736C9.79635 19.8389 10.4354 20.2542 11.2935 20.2542ZM17.2823 18.7556C17.2823 19.6764 17.757 20.2542 18.7065 20.2542C19.5646 20.2542 20.2037 19.8389 20.2037 18.7736C20.2037 17.7444 19.6559 17.2208 18.3596 17.2208H17.2823V18.7556Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1291_2779"
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
            result="effect1_dropShadow_1291_2779"
          />
          <feOffset />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0666667 0 0 0 0 0.0705882 0 0 0 0 0.0941176 0 0 0 0.3 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1291_2779" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1291_2779"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default Command
