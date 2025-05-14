import styled from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  background-color: #f9fafb;
  overflow-y: auto;
  margin-left: 250px;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

const DashboardHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #111827;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

export {
  DashboardContainer,
  MainContent,
  DashboardHeader,
  Title,
  Subtitle,
  ContentGrid,
};
