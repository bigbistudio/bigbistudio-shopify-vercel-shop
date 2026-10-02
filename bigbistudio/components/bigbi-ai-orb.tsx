"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface BigbiAiOrbProps {
  size?: number;
  animate?: boolean;
}

interface Position {
  x: number;
  y: number;
}

const CENTER_POSITIONS: Position[] = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 2, y: 0 },
  { x: -2, y: 0 },
  { x: 0, y: 2 },
  { x: 0, y: -2 },
];

const SMALL_POSITIONS: Position[] = [
  { x: 5, y: 0 },
  { x: -5, y: 0 },
  { x: 0, y: 5 },
  { x: 0, y: -5 },
  { x: 4, y: 4 },
  { x: -4, y: 4 },
  { x: 4, y: -4 },
  { x: -4, y: -4 },
  { x: 7, y: 0 },
  { x: -7, y: 0 },
  { x: 0, y: 7 },
  { x: 0, y: -7 },
];

const DISTANT_POSITIONS: Position[] = [
  { x: 13, y: 13 },
  { x: -13, y: 13 },
  { x: 13, y: -13 },
  { x: -13, y: -13 },
  { x: 16, y: 0 },
  { x: -16, y: 0 },
  { x: 0, y: 16 },
  { x: 0, y: -16 },
  { x: 18, y: 0 },
  { x: -18, y: 0 },
];

const GREETING = "Hey, I'm bigbi";
const MESSAGE = "How can I help you?";

function Sparkle({
  size,
  orbit,
  duration,
  delay,
  startAngle,
}: {
  size: number;
  orbit: number;
  duration: number;
  delay: number;
  startAngle: number;
}) {
  const angle = (startAngle * Math.PI) / 180;

  const startX = Math.cos(angle) * orbit;
  const startY = Math.sin(angle) * orbit;

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      initial={{
        opacity: 0,
        scale: 0.3,
        rotate: startAngle,
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0.3, 1, 1, 0.3],
        rotate: startAngle + 360,
      }}
      transition={{
        duration,
        delay,
        ease: "easeInOut",
        opacity: {
          duration,
          times: [0, 0.18, 0.72, 1],
          ease: "easeInOut",
        },
        scale: {
          duration,
          times: [0, 0.18, 0.72, 1],
          ease: "easeInOut",
        },
      }}
    >
      <motion.div
        animate={{
          x: [startX, -startX, startX],
          y: [startY, -startY, startY],
        }}
        transition={{
          duration,
          delay,
          ease: "linear",
        }}
        className="h-full w-full"
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            <linearGradient
              id={`bigbi-star-${size}-${startAngle}`}
              x1="4"
              y1="4"
              x2="20"
              y2="20"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#17A3F2" />
              <stop offset="45%" stopColor="#4DBAF5" />
              <stop offset="100%" stopColor="#A7E2FF" />
            </linearGradient>

            <filter
              id={`bigbi-star-glow-${size}-${startAngle}`}
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
          </defs>

          <path
            d="M12 1.5L14.4 9.6L22.5 12L14.4 14.4L12 22.5L9.6 14.4L1.5 12L9.6 9.6L12 1.5Z"
            fill="#17A3F2"
            fillOpacity="0.3"
            filter={`url(#bigbi-star-glow-${size}-${startAngle})`}
          />

          <path
            d="M12 1.5L14.4 9.6L22.5 12L14.4 14.4L12 22.5L9.6 14.4L1.5 12L9.6 9.6L12 1.5Z"
            fill={`url(#bigbi-star-${size}-${startAngle})`}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function HoverSparkle({
  size,
  x,
  y,
  delay,
}: {
  size: number;
  x: number;
  y: number;
  delay: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      initial={{
        opacity: 0,
        scale: 0.2,
        x: 0,
        y: 8,
      }}
      animate={{
        opacity: [0, 1, 0.9, 0],
        scale: [0.2, 1.2, 0.9, 0.3],
        x: [0, x * 0.45, x],
        y: [8, y * 0.45, y],
      }}
      transition={{
        duration: 1.4,
        delay,
        ease: "easeOut",
        times: [0, 0.18, 0.55, 1],
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient
            id={`bigbi-hover-star-${size}-${x}-${y}`}
            x1="4"
            y1="4"
            x2="20"
            y2="20"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#17A3F2" />
            <stop offset="45%" stopColor="#4DBAF5" />
            <stop offset="100%" stopColor="#A7E2FF" />
          </linearGradient>

          <filter
            id={`bigbi-hover-glow-${size}-${x}-${y}`}
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        <path
          d="M12 1.5L14.4 9.6L22.5 12L14.4 14.4L12 22.5L9.6 14.4L1.5 12L9.6 9.6L12 1.5Z"
          fill="#17A3F2"
          fillOpacity="0.3"
          filter={`url(#bigbi-hover-glow-${size}-${x}-${y})`}
        />

        <path
          d="M12 1.5L14.4 9.6L22.5 12L14.4 14.4L12 22.5L9.6 14.4L1.5 12L9.6 9.6L12 1.5Z"
          fill={`url(#bigbi-hover-star-${size}-${x}-${y})`}
        />
      </svg>
    </motion.div>
  );
}

export function BigbiAiOrb({ size = 48, animate = true }: BigbiAiOrbProps) {
  const [eye, setEye] = useState<Position>({
    x: 0,
    y: 0,
  });

  const [hovered, setHovered] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!animate || hovered || !visible) return;

    let timeout: ReturnType<typeof setTimeout>;

    const getNextEyePosition = (): Position => {
      const random = Math.random();

      if (random < 0.65) {
        return CENTER_POSITIONS[Math.floor(Math.random() * CENTER_POSITIONS.length)];
      }

      if (random < 0.9) {
        return SMALL_POSITIONS[Math.floor(Math.random() * SMALL_POSITIONS.length)];
      }

      return DISTANT_POSITIONS[Math.floor(Math.random() * DISTANT_POSITIONS.length)];
    };

    const moveEye = () => {
      setEye(getNextEyePosition());

      const nextDelay = 1800 + Math.random() * 4200;

      timeout = setTimeout(moveEye, nextDelay);
    };

    timeout = setTimeout(moveEye, 1800);

    return () => {
      clearTimeout(timeout);
    };
  }, [animate, hovered, visible]);

  useEffect(() => {
    if (!animate || hovered || !visible) return;

    let showTimeout: ReturnType<typeof setTimeout>;
    let hideTimeout: ReturnType<typeof setTimeout>;

    const triggerSparkles = () => {
      setShowSparkles(true);

      hideTimeout = setTimeout(() => {
        setShowSparkles(false);
      }, 2800);

      showTimeout = setTimeout(triggerSparkles, 7000 + Math.random() * 7000);
    };

    showTimeout = setTimeout(triggerSparkles, 3500 + Math.random() * 5000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [animate, hovered, visible]);

  useEffect(() => {
    if (!hovered) {
      setTypedMessage("");
      return;
    }

    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const startTyping = () => {
      if (index >= MESSAGE.length) return;

      index += 1;
      setTypedMessage(MESSAGE.slice(0, index));

      timeout = setTimeout(startTyping, 55);
    };

    timeout = setTimeout(startTyping, 900);

    return () => {
      clearTimeout(timeout);
    };
  }, [hovered]);

  const pupilX = eye.x === 0 ? 0 : (eye.x / 18) * 4;
  const pupilY = eye.y === 0 ? 0 : (eye.y / 18) * 4;

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: visible ? 1 : 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      style={{
        width: size,
        height: size,
      }}
      onMouseEnter={() => {
        setHovered(true);
        setEye({ x: 0, y: 0 });
        setShowSparkles(false);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className="fixed right-4 bottom-4 z-50 sm:right-[5%] sm:bottom-[8%]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-visible">
        {showSparkles && (
          <>
            <Sparkle size={18} orbit={132} duration={2.8} delay={0} startAngle={-35} />

            <Sparkle size={11} orbit={120} duration={2.4} delay={0.15} startAngle={105} />

            <Sparkle size={10} orbit={144} duration={2.6} delay={0.3} startAngle={215} />
          </>
        )}

        {hovered && (
          <>
            <HoverSparkle size={18} x={-22} y={-60} delay={0} />

            <HoverSparkle size={11} x={10} y={-40} delay={0.18} />

            <HoverSparkle size={10} x={24} y={-64} delay={0.36} />
          </>
        )}
      </div>

      <motion.div
        initial={false}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 8,
          scale: hovered ? 1 : 0.96,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        className="pointer-events-none absolute right-0 bottom-[calc(100%+12px)] min-w-max rounded-2xl border border-white/60 bg-white/45 px-4 py-2.5 shadow-lg shadow-black/5 backdrop-blur-xl"
      >
        <div className="flex flex-col gap-0.5 text-sm tracking-tight">
          <span className="font-medium text-black">{GREETING}</span>

          <span className="min-h-[20px] font-medium text-black/65">
            {typedMessage}

            {hovered && typedMessage.length < MESSAGE.length && (
              <motion.span
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="ml-0.5 inline-block"
              >
                |
              </motion.span>
            )}
          </span>
        </div>
      </motion.div>

      <motion.div
        animate={{
          scale: hovered ? 1.12 : 1,
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className="origin-center"
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Bigbi AI"
        >
          <defs>
            <radialGradient id="bigbi-sphere" cx="28%" cy="20%" r="99%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#FAFAFA" />
              <stop offset="58%" stopColor="#F0F0F0" />
              <stop offset="76%" stopColor="#DADADA" />
              <stop offset="90%" stopColor="#AFAFAF" />
              <stop offset="100%" stopColor="#707070" />
            </radialGradient>

            <radialGradient id="bigbi-highlight" cx="27%" cy="18%" r="58%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="60" cy="60" r="56" fill="url(#bigbi-sphere)" />

          <circle cx="60" cy="60" r="56" fill="url(#bigbi-highlight)" />

          <circle cx="60" cy="60" r="56" stroke="#000000" strokeWidth="1" strokeOpacity="0.1" />

          <motion.g
            animate={{
              x: eye.x,
              y: eye.y,
            }}
            transition={{
              duration: hovered ? 0.55 : 1.1,
              ease: "easeInOut",
            }}
          >
            <circle cx="60" cy="60" r="27" fill="#000000" />

            <circle cx="60" cy="60" r="18" fill="#FFFFFF" />

            <motion.g
              animate={{
                x: hovered ? 0 : pupilX,
                y: hovered ? 0 : pupilY,
              }}
              transition={{
                duration: hovered ? 0.4 : 0.55,
                ease: "easeInOut",
              }}
            >
              <motion.circle
                cx="60"
                cy="60"
                fill="#000000"
                animate={{
                  r: hovered ? 12 : 11,
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                }}
              />

              <motion.circle
                cx="60"
                cy="60"
                fill="#FFFFFF"
                animate={{
                  r: hovered ? 3.3 : 2.5,
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                }}
              />
            </motion.g>
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
}
