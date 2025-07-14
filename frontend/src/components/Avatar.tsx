import React from "react";
import styled from "styled-components";

const StyledAvatar = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.lightPink};
  border: 2.5px solid ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ size }) => Math.floor(size / 2.5)}px;
  color: ${({ theme }) => theme.colors.primary};
  user-select: none;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

type AvatarProps = {
  src?: string;
  alt?: string;
  size?: number;
  name?: string; 
};

function getInitials(name?: string) {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function Avatar({ src, alt, size = 48, name }: AvatarProps) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <StyledAvatar size={size}>
      {!src || imgError ? (
        <span>{getInitials(name || alt)}</span>
      ) : (
        <Img
          src={src}
          alt={alt || "User avatar"}
          onError={() => setImgError(true)}
        />
      )}
    </StyledAvatar>
  );
}

