import styled from "styled-components";

const Alert = styled.div`
  background: rgba(229, 62, 62, 0.1);
  color: ${({ theme }) => theme.colors.red};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors.red};
`;

type ErrorAlertProps = {
  message: string;
};

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return <Alert>{message}</Alert>;
}
