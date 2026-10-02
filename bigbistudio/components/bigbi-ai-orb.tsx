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

export function BigbiAiOrb({ size = 48, animate = true }: BigbiAiOrbProps) {
  const [eye, setEye] = useState<Position>({
    x: 0,
    y: 0,
  });

  const [hovered, setHovered] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [visible, setVisible] = useState(false);

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
        scale: 0.7,
      }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? [0.7, 1.18, 1] : 0.7,
      }}
      transition={{
        duration: 1.1,
        times: [0, 0.55, 1],
        ease: "easeInOut",
      }}
      style={{
        width: size,
        height: size,
      }}
      onMouseEnter={() => {
        setHovered(true);
        setEye({ x: 0, y: 0 });
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className="fixed right-4 bottom-4 z-50 sm:right-[5%] sm:bottom-[8%]"
    >
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
            <radialGradient id="bigbi-sphere" cx="28%" cy="20%" r="90%">
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
                cx="63"
                cy="56"
                fill="#FFFFFF"
                animate={{
                  r: hovered ? 3.3 : 3,
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
