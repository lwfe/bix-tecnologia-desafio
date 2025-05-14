"use client";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  Home,
  LogOut,
  Menu,
  X,
  BarChart2,
  CreditCard,
  Users,
  Settings,
} from "lucide-react";

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

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const userInitial = user?.email ? user.email[0].toUpperCase() : "U";

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <Logo>
            <BarChart2 size={20} />
            Finance Dashboard
          </Logo>
          <CloseButton onClick={closeSidebar}>
            <X size={20} />
          </CloseButton>
        </SidebarHeader>

        <SidebarContent>
          <Link href="/dashboard" onClick={closeSidebar}>
            <NavItem isActive={true}>
              <Home size={18} />
              <NavText>Dashboard</NavText>
            </NavItem>
          </Link>

          <NavItem>
            <CreditCard size={18} />
            <NavText>Transações</NavText>
          </NavItem>

          <NavItem>
            <Users size={18} />
            <NavText>Contas</NavText>
          </NavItem>

          <NavItem>
            <Settings size={18} />
            <NavText>Configurações</NavText>
          </NavItem>

          <NavItem onClick={handleLogout}>
            <LogOut size={18} />
            <NavText>Sair</NavText>
          </NavItem>
        </SidebarContent>

        <SidebarFooter>
          <UserInfo>
            <UserAvatar>{userInitial}</UserAvatar>
            <UserDetails>
              <UserName>Usuário</UserName>
              <UserEmail>{user?.email}</UserEmail>
            </UserDetails>
          </UserInfo>
        </SidebarFooter>
      </SidebarContainer>

      <MobileMenuButton onClick={toggleSidebar}>
        <Menu size={20} />
      </MobileMenuButton>

      <Overlay isOpen={isOpen} onClick={closeSidebar} />
    </>
  );
}
