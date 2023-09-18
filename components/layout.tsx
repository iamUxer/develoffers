// import styled from 'styled-components';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import ProtectedRoute from './auth-provider';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      Layout!
      <StyledLayout>{children}</StyledLayout>
    </>
  );
};

export default Layout;

const StyledLayout = styled.div`
  h2 {
    margin-bottom: 15px;
    color: ${theme.palette.primary};
  }
`;
