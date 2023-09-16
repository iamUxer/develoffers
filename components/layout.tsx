// import styled from 'styled-components';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

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
    color: ${theme.palette.primary};
  }
`;
