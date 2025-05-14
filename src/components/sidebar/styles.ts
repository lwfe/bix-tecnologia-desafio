import styled from "styled-components";

const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  background-color: #1e293b;
  color: white;
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: transform 0.3s ease;
  z-index: 50;

  @media (max-width: 768px) {
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(-100%)"};
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const SidebarContent = styled.div`
  padding: 1.5rem 0;
`;

const NavItem = styled.div<{ isActive?: boolean }>`
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }

  ${({ isActive }) =>
    isActive &&
    `
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border-left: 3px solid #4f46e5;
  `}
`;

const NavText = styled.span`
  font-size: 0.875rem;
`;

const SidebarFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #4f46e5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
`;

const UserEmail = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
`;

const MobileMenuButton = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background-color: #4f46e5;
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 40;
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};

  @media (min-width: 769px) {
    display: none;
  }
`;

export {
  SidebarContainer,
  SidebarHeader,
  Logo,
  CloseButton,
  SidebarContent,
  NavItem,
  NavText,
  SidebarFooter,
  UserInfo,
  UserAvatar,
  UserDetails,
  UserName,
  UserEmail,
  MobileMenuButton,
  Overlay,
};
