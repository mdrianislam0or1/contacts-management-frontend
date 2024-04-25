import styled from "styled-components";

const SuccessContainer = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #c3e6cb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 300px;
  margin: 0 auto;
`;

const SuccessStatus = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 18px;
`;

const SuccessMessage = styled.div`
  font-size: 16px;
  line-height: 1.5;
`;
interface SuccessProps {
  status: string;
  message: string;
}

const Success = ({ status, message }: SuccessProps) => {
  return (
    <SuccessContainer>
      <SuccessStatus>{status}</SuccessStatus>
      <SuccessMessage>{message}</SuccessMessage>
    </SuccessContainer>
  );
};

export default Success;
