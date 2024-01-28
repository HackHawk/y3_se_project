import DisplayNavbar from '@/components/Navbar/DisplayNavbar';

const adminLayout = ({ children }) => (
  <div suppressHydrationWarning>
    <DisplayNavbar />

    <div className='px-5 md:px-12'>{children}</div>
  </div>
);

export default adminLayout;
