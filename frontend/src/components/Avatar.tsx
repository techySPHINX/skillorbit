import styled from "styled-components";

const StyledAvatar = styled.img<{ size?: number }>`
  width: ${({ size }) => size || 48}px;
  height: ${({ size }) => size || 48}px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #4f8cff;
  background: #f0f4f8;
`;

type AvatarProps = {
  src?: string;
  alt?: string;
  size?: number;
};

export default function Avatar({ src, alt, size = 48 }: AvatarProps) {
  return (
    <StyledAvatar
      src={src || "/default-avatar.png"}
      alt={alt || "User avatar"}
      size={size}
    />
  );
}
