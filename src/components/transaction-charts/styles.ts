import styled from "styled-components";

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ChartCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ChartTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
`;

const ChartControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ChartButton = styled.button<{ active?: boolean }>`
  background-color: ${(props) => (props.active ? "#4f46e5" : "white")};
  color: ${(props) => (props.active ? "white" : "#6b7280")};
  border: 1px solid ${(props) => (props.active ? "#4f46e5" : "#e5e7eb")};
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? "#4338ca" : "#f9fafb")};
  }
`;

const ChartContent = styled.div`
  flex: 1;
  width: 100%;
`;

export {
  ChartsContainer,
  ChartCard,
  ChartHeader,
  ChartTitle,
  ChartControls,
  ChartButton,
  ChartContent,
};
