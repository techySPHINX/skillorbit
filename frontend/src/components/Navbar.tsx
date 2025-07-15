import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";
import { FaHome, FaLightbulb, FaExchangeAlt, FaCommentDots, FaBell, FaUserCircle, FaSignInAlt } from "react-icons/fa";

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.xLarge};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    color: #c2185b; /* A slightly darker pink for hover */
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.darkGray};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: 500;
  transition: color 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <Logo to="/"><FaHome /> SkillOrbit</Logo>
      <NavLinks>
        <NavLink to="/skills"><FaLightbulb /> Skills</NavLink>
        <NavLink to="/swaps"><FaExchangeAlt /> Swaps</NavLink>
        <NavLink to="/feedback"><FaCommentDots /> Feedback</NavLink>
        <NavLink to="/notifications"><FaBell /> Notifications</NavLink>
        <NavLink to="/profile"><FaUserCircle /> Profile</NavLink>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button variant="primary">
            <FaSignInAlt /> Login
          </Button>
        </Link>
      </NavLinks>
    </Nav>
  );
}