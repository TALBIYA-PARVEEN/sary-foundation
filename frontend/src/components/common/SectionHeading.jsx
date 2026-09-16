import React from 'react';

const SectionHeading = ({ 
  badge, 
  title, 
  subtitle, 
  center = true, 
  light = false 
}) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
      {badge && (
        <span className="inline-block text-xs font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full bg-emerald-100/80 text-brand-forest mb-3">
          {badge}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
        light ? 'text-white' : 'text-brand-dark'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-sm sm:text-base max-w-2xl leading-relaxed ${
          center ? 'mx-auto' : ''
        } ${light ? 'text-gray-300' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
