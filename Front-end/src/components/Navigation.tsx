import React from 'react';
import { Search, BarChart2, Calculator, BookOpen, LogIn, Plane as Plant } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Plant className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-green-800">HarvestWise</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink to="/" icon={Search} text="Crop Search" />
              <NavLink to="/analytics" icon={BarChart2} text="Analytics" />
              <NavLink to="/" icon={Calculator} text="Calculator" />
              <NavLink to="/knowledge-base" icon={BookOpen} text="Knowledge Base" />
            </div>
          </div>
          <div className="flex items-center">
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon: Icon, text }: { to: string; icon: any; text: string }) => (
  <Link
    to={to}
    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-green-600"
  >
    <Icon className="h-4 w-4 mr-2" />
    {text}
  </Link>
);