export default function DogScratch() {
  return (
    <svg
      width="28"
      height="33"
      viewBox="0 0 62 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Wagging tail */}
      <g className="dog-tail">
        <path
          d="M 50 54 Q 59 45 55 36 Q 52 29 56 23"
          stroke="#6e8a9e"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 50 54 Q 59 45 55 36 Q 52 29 56 23"
          stroke="#8fa8bc"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </g>

      {/* Left ear - small rose/fold ear */}
      <path d="M 13 13 Q 10 4 19 5 Q 23 11 15 16 Z" fill="#6e8a9e" />
      <path d="M 14 13 Q 12 6 19 7 Q 21 12 16 15 Z" fill="#c08898" />

      {/* Right ear - wiggles during scratch */}
      <g className="dog-ear-right">
        <path d="M 49 13 Q 52 4 43 5 Q 39 11 47 16 Z" fill="#6e8a9e" />
        <path d="M 48 13 Q 50 6 43 7 Q 41 12 46 15 Z" fill="#c08898" />
      </g>

      {/* Skull - wide blocky pit bull head */}
      <ellipse cx="31" cy="21" rx="21" ry="15" fill="#8fa8bc" />

      {/* Cheek muscles - wide jaw characteristic */}
      <ellipse cx="12" cy="27" rx="8.5" ry="7" fill="#8fa8bc" />
      <ellipse cx="50" cy="27" rx="8.5" ry="7" fill="#8fa8bc" />

      {/* Muzzle box - wide, blocky, pit bull signature */}
      <rect x="16" y="27" width="30" height="16" rx="6" fill="#adbdcc" />

      {/* Stop wrinkle between eyes */}
      <path d="M 28 22 Q 31 20 34 22" stroke="#7a9aae" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* Eyebrows - slightly furrowed */}
      <path d="M 17 15 Q 22 12 27 14" stroke="#5e7e92" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 35 14 Q 40 12 45 15" stroke="#5e7e92" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Left eye - wide-set, almond */}
      <g className="dog-blink-left">
        <ellipse cx="22" cy="21" rx="4" ry="3.5" fill="#1a1208" />
        <circle cx="23.5" cy="19.5" r="1.2" fill="white" opacity="0.85" />
      </g>

      {/* Right eye - wide-set, almond */}
      <g className="dog-blink-right">
        <ellipse cx="40" cy="21" rx="4" ry="3.5" fill="#1a1208" />
        <circle cx="41.5" cy="19.5" r="1.2" fill="white" opacity="0.85" />
      </g>

      {/* Nose - wide flat pit bull nose */}
      <ellipse cx="31" cy="33" rx="7.5" ry="5" fill="#1a1a1a" />
      <ellipse cx="28" cy="31.5" rx="2" ry="1.2" fill="#444" opacity="0.55" />
      <line x1="26" y1="33" x2="36" y2="33" stroke="#0a0a0a" strokeWidth="0.6" />

      {/* Cheek blushes */}
      <ellipse cx="13" cy="30" rx="4.5" ry="3" fill="#e0a0a8" opacity="0.3" />
      <ellipse cx="49" cy="30" rx="4.5" ry="3" fill="#e0a0a8" opacity="0.3" />

      {/* Mouth */}
      <line x1="31" y1="33" x2="31" y2="37" stroke="#5a7a8e" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M 24 38 Q 31 43 38 38" stroke="#5a7a8e" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Tongue - appears during scratch */}
      <g className="dog-tongue">
        <ellipse cx="31" cy="41" rx="3.5" ry="4" fill="#e87090" />
        <path d="M 27.5 41 Q 31 45.5 34.5 41" stroke="#d06080" strokeWidth="1" fill="none" />
      </g>

      {/* Body - barrel chest, muscular */}
      <ellipse cx="31" cy="58" rx="21" ry="15" fill="#8fa8bc" />

      {/* Chest highlight */}
      <ellipse cx="31" cy="59" rx="13" ry="10" fill="#adbdcc" opacity="0.4" />

      {/* Left paw */}
      <ellipse cx="17" cy="70" rx="7.5" ry="4.5" fill="#7a9aae" />
      <circle cx="13.5" cy="68" r="1.8" fill="#6a8a9e" />
      <circle cx="17" cy="67" r="1.8" fill="#6a8a9e" />
      <circle cx="20.5" cy="68" r="1.8" fill="#6a8a9e" />

      {/* Right paw - scratching */}
      <g className="dog-scratch-paw">
        <ellipse cx="45" cy="70" rx="7.5" ry="4.5" fill="#7a9aae" />
        <circle cx="41.5" cy="68" r="1.8" fill="#6a8a9e" />
        <circle cx="45" cy="67" r="1.8" fill="#6a8a9e" />
        <circle cx="48.5" cy="68" r="1.8" fill="#6a8a9e" />
      </g>
    </svg>
  );
}
