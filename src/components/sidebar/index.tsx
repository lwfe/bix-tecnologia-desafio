"use client";

import Link from "next/link";
import { useState } from "react";
import { X, Menu, Laptop, LogOut, LayoutDashboard } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

import {
  CloseButton,
  Logo,
  MobileMenuButton,
  NavItem,
  NavText,
  Overlay,
  SidebarContainer,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  UserAvatar,
  UserDetails,
  UserEmail,
  UserInfo,
  UserName,
} from "./styles";

export function Sidebar() {
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
            <Laptop size={20} />
            BixTecnologia
          </Logo>
          <CloseButton onClick={closeSidebar}>
            <X size={20} />
          </CloseButton>
        </SidebarHeader>

        <SidebarContent>
          <Link href="/dashboard" onClick={closeSidebar}>
            <NavItem isActive={true}>
              <LayoutDashboard size={18} />
              <NavText>Dashboard</NavText>
            </NavItem>
          </Link>

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
