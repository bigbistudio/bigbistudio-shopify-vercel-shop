import Image from "next/image";

type LogoProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

export function Logo({
  src,
  alt,
  width = 140,
  height = 28,
  className,
  priority = false,
}: LogoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={{
        width,
        height,
      }}
    />
  );
}
