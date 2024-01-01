import { Outlet } from 'react-router-dom';
import MarketingNav from '../marketing/components/MarketingNav';

const AdminLayout = () => {
  return (
    <>
      <MarketingNav />
      <Outlet></Outlet>
    </>
  );
};

export default AdminLayout;
