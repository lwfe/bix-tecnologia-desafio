import styled from "styled-components";

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
`;

const IconWrapper = styled.div<{ color: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const CardValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
`;

const CardFooter = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PositiveChange = styled.span`
  color: #10b981;
  display: flex;
  align-items: center;
`;

const NegativeChange = styled.span`
  color: #ef4444;
  display: flex;
  align-items: center;
`;

export {
  CardsGrid,
  Card,
  CardHeader,
  CardTitle,
  IconWrapper,
  CardValue,
  CardFooter,
  PositiveChange,
  NegativeChange,
};
