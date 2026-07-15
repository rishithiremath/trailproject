export default function GradualBlur() {
  const blurLayers = [
    { blur: '0.06rem', gradient: 'linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)' },
    { blur: '0.12rem', gradient: 'linear-gradient(to bottom, transparent 10%, black 20%, black 70%, transparent 90%)' },
    { blur: '0.25rem', gradient: 'linear-gradient(to bottom, transparent 20%, black 30%, black 60%, transparent 80%)' },
    { blur: '0.5rem', gradient: 'linear-gradient(to bottom, transparent 30%, black 40%, black 50%, transparent 70%)' },
    { blur: '1rem', gradient: 'linear-gradient(to bottom, transparent 40%, black 50%, black 50%, transparent 60%)' },
    { blur: '1.5rem', gradient: 'linear-gradient(to bottom, transparent 50%, black 55%, black 55%, transparent 55%)' },
    { blur: '2rem', gradient: 'linear-gradient(to bottom, transparent 55%, black 60%, black 60%, transparent 50%)' },
    { blur: '2.5rem', gradient: 'linear-gradient(to bottom, transparent 60%, black 65%, black 65%, transparent 45%)' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none">
      {blurLayers.map((layer, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${layer.blur})`,
            WebkitBackdropFilter: `blur(${layer.blur})`,
            maskImage: layer.gradient,
            WebkitMaskImage: layer.gradient,
          }}
        />
      ))}
    </div>
  );
}
