function BorderAnimatedContainer({ children }) {
  return (
    <div
      className="
        w-full h-full relative rounded-2xl overflow-hidden
        border border-transparent
        animate-border
        [background:
          linear-gradient(
            180deg,
            rgba(15,23,42,0.85),
            rgba(15,23,42,0.85)
          )_padding-box,
          conic-gradient(
            from_var(--border-angle),
            rgba(34,211,238,0.15),
            rgba(45,212,191,0.45),
            rgba(34,211,238,0.85),
            rgba(45,212,191,0.45),
            rgba(34,211,238,0.15)
          )_border-box
        ]
        shadow-[0_0_40px_-15px_rgba(34,211,238,0.35)]
        backdrop-blur-xl
        flex
      "
    >
      {children}
    </div>
  );
}

export default BorderAnimatedContainer;
