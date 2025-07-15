
import { Parallax } from "react-parallax";
import type { ReactNode } from "react";

type ParallaxContainerProps = {
  children: ReactNode;
  imageUrl: string;
  strength?: number;
};

export default function ParallaxContainer({ children, imageUrl, strength = 400 }: ParallaxContainerProps) {
  return (
    <Parallax bgImage={imageUrl} strength={strength}>
      {children}
    </Parallax>
  );
}
