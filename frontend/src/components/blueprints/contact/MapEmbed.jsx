import React from 'react';

const MapEmbed = () => {
  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-card border border-gray-200 h-[380px] bg-gray-100">
      <iframe
        title="SARY Foundation Kanpur Location"
        src="https://maps.google.com/maps?q=Lakhanpur%2C%20Vikas%20Nagar%2C%20Kanpur%2C%20Uttar%20Pradesh%20208024&t=m&z=14&output=embed&iwloc=near"
        className="w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default MapEmbed;
