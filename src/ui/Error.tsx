import styled from "styled-components";

const ErrorContainer = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #f5c6cb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 300px;
  margin: 0 auto;
  margin-top: 20px;
`;

const ErrorStatus = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const ErrorMessage = styled.div`
  font-size: 14px;
`;

interface ErrorProps {
  status: string;
  message: string;
}

const Error: React.FC<ErrorProps> = ({ status, message }) => {
  return (
    <ErrorContainer>
      <ErrorStatus>{status}</ErrorStatus>
      <ErrorMessage>{message}</ErrorMessage>
    </ErrorContainer>
  );
};

export default Error;
