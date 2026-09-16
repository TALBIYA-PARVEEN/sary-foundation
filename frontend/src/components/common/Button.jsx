import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon: Icon, 
  onClick, 
  type = 'button',
  disabled = false,
  ...props 
}) => {
  const base = "inline-flex items-center justify-center font-bold transition-all rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "eco-gradient-btn text-white shadow-md hover:shadow-lg",
    secondary: "bg-brand-dark text-white hover:bg-black shadow-md",
    gold: "gold-badge font-extrabold shadow-md hover:brightness-105",
    outline: "border-2 border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white",
    ghost: "text-brand-dark hover:bg-gray-100",
    white: "bg-white text-brand-dark hover:bg-gray-50 shadow-md"
  };

  const sizes = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-3.5 gap-2.5"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
