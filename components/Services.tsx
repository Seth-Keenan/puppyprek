
import React from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">Our Training Programs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Expertly crafted programs designed to foster a lifelong bond between you and your puppy.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
              
              <ul className="mb-8 space-y-3">
                {service.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2"></span>
                    {detail}
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <span className="text-brand-700 font-bold">{service.price}</span>
                <button className="text-brand-600 font-semibold text-sm hover:underline">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
