interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function Icon({ name, className = "", size = 24 }: IconProps) {
  const iconMap: Record<string, string> = {
    'zero-setup': '/assets/icons/zero-setup.svg',
    'security': '/assets/icons/security.svg',
    'roi': '/assets/icons/roi.svg',
    'ops': '/assets/icons/ops.svg',
    'dev': '/assets/icons/dev.svg',
    'data': '/assets/icons/data.svg',
  };

  const iconPath = iconMap[name];
  
  if (!iconPath) {
    console.warn(`Icon "${name}" not found in icon map`);
    return (
      <div 
        className={className}
        style={{ 
          width: size, 
          height: size, 
          background: 'var(--muted)',
          borderRadius: '4px',
          display: 'inline-block'
        }}
        aria-label={`${name} icon`}
      />
    );
  }

  return (
    <img
      src={iconPath}
      alt={`${name} icon`}
      className={className}
      style={{ width: size, height: size }}
      loading="lazy"
      decoding="async"
    />
  );
}
