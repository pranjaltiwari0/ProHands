import React, { useState } from 'react'
import prohands1 from '../assets/prohands1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { services } from './Services'
import ServiceInfo from './ServiceInfo'
import Loginprofile from '../pages/Loginprofile'

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileClick = () => {
    navigate('/loginprofile');
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      const filtered = services.filter(service =>
        service.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredServices(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleServiceSelect = (service) => {
    setSearchTerm(service.name);
    setShowSuggestions(false);
    setSelectedService(service);
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex-shrink-0">
              <img
                src={prohands1}
                className="h-8 w-auto sm:h-10"
                alt="Logo"
              />
            </div>

            {/* Search Bar - Hidden on mobile, visible on desktop */}
            <div className="hidden sm:block flex-1 mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon 
                    icon={faSearch} 
                    className="h-5 w-5 text-gray-400"
                  />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search for services"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                           bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent"
                />
                
                {/* Search Suggestions */}
                {showSuggestions && (
                  <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {filteredServices.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => handleServiceSelect(service)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <div className="text-sm text-gray-700">{service.name}</div>
                        <div className="text-xs text-gray-500">{service.category}</div>
                      </div>
                    ))}
                    {filteredServices.length === 0 && (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No services found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Profile Button */}
            <div className="flex items-center">
              <button 
                onClick={() => setIsProfileOpen(true)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <FontAwesomeIcon 
                  icon={faUser} 
                  className="h-6 w-6 text-gray-600"
                />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar - Visible only on mobile */}
          <div className="sm:hidden pb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="h-5 w-5 text-gray-400"
                />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for services"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                         bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent"
              />
              
              {/* Mobile Search Suggestions */}
              {showSuggestions && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="text-sm text-gray-700">{service.name}</div>
                      <div className="text-xs text-gray-500">{service.category}</div>
                    </div>
                  ))}
                  {filteredServices.length === 0 && (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No services found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Service Info Modal */}
      {selectedService && (
        <ServiceInfo 
          service={selectedService} 
          onClose={() => setSelectedService(null)}
        />
      )}

      <Loginprofile 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </>
  )
}

export default Navbar