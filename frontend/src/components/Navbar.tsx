import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";
import { FaHome, FaLightbulb, FaExchangeAlt, FaCommentDots, FaBell, FaUserCircle, FaSignInAlt, FaSignOutAlt, FaUserShield } from "react-icons/fa";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { logout } from "../store/authSlice";

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
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Nav>
      <Logo to="/"><FaHome /> SkillOrbit</Logo>
      <NavLinks>
        <NavLink to="/skills"><FaLightbulb /> Skills</NavLink>
        <NavLink to="/swaps"><FaExchangeAlt /> Swaps</NavLink>
        {user && (
          <>
            <NavLink to={`/feedback/user/${user._id}`}><FaCommentDots /> Feedback</NavLink>
            <NavLink to="/notifications"><FaBell /> Notifications</NavLink>
            <NavLink to={`/profile/${user._id}`}><FaUserCircle /> Profile</NavLink>
            {user.roles?.includes('admin') && (
              <NavLink to="/admin"><FaUserShield /> Admin</NavLink>
            )}
            <Button variant="secondary" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </Button>
          </>
        )}
        {!user && (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button variant="primary">
              <FaSignInAlt /> Login
            </Button>
          </Link>
        )}
      </NavLinks>
    </Nav>
  );
}