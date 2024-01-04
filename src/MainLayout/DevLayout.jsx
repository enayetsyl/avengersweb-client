import { Outlet } from 'react-router-dom';
import MarketingNav from '../marketing/components/MarketingNav';

const DevelopmentLayout = () => {
  return (
    <>
      <MarketingNav />
      <Outlet></Outlet>
    </>
  );
};

export default DevelopmentLayout;
