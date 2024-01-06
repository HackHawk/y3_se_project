import DisplayNavbar from '@/components/Navbar/DisplayNavbar';

const adminLayout = ({ children }) => (
  <div suppressHydrationWarning>
    <DisplayNavbar />
    <div>{children}</div>
  </div>
);

export default adminLayout;
