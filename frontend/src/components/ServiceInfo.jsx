import React from 'react'

const ServiceInfo = ({ service, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {/* Header with Image */}
        <div className="mb-4">
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          {/* Service Image */}
          <div className="flex justify-center mb-4">
            <img 
              src={service.imageUrl} 
              alt={service.name}
              className="w-64 h-52 object-cover rounded-lg"
            />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {service.name}
          </h2>
        </div>

        {/* Category */}
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            {service.category}
          </span>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-600">{service.description}</p>
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Price Range</h3>
          <p className="text-gray-600">{service.priceRange}</p>
        </div>

        {/* Book Now Button */}
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          Book Now
        </button>
      </div>
    </div>
  )
}

export default ServiceInfo 