import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <span>{new Date().getFullYear()} OM-PAY. All rights reserved.
            Powered by OMENGE TECH SOLUTIONS.
          </span>
          {!location.pathname.includes('/signin') && (
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Logout</button>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;