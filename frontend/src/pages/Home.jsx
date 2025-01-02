import React from 'react';
import homebanner from '../assets/homebanner.png';
import { services } from '../components/Services';
import ServiceInfo from '../components/ServiceInfo';
import { reviews } from '../data/reviews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';

const Home = () => {
  const [selectedService, setSelectedService] = React.useState(null);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={index < rating ? "text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="pt-16 bg-sky-200 min-h-screen">
      {/* Banner Section */}
      <div
        className="relative h-[200px] sm:h-[400px] w-full bg-gray-200 bg-cover bg-center"
        style={{
          backgroundImage: `url(${homebanner})`,
        }}
      />

      {/* Services Section */}
      <div className="px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 px-4">Our Services</h2>
        
        {/* Scrollable Services Container */}
        <div className="flex overflow-x-auto space-x-4 pb-6 px-4 scrollbar-hide">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex-none cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              {/* Service Card */}
              <div className="w-48 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-48 h-36 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {service.name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {service.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="px-4 py-8 bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 px-4">Customer Reviews</h2>
        
        {/* Scrollable Reviews Container */}
        <div className="flex overflow-x-auto space-x-4 pb-6 px-4 scrollbar-hide">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex-none w-80 bg-white rounded-lg shadow-lg p-6 border border-gray-100"
            >
              {/* Review Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-800">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.service}</p>
                </div>
                <span className="text-sm text-gray-400">{review.date}</span>
              </div>
              
              {/* Rating Stars */}
              <div className="flex space-x-1 mb-3">
                {renderStars(review.rating)}
              </div>
              
              {/* Review Comment */}
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Service Info Modal */}
      {selectedService && (
        <ServiceInfo
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

export default Home;
