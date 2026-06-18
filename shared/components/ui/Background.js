export default function Background() {
  return (
    <>
      {/* SVG wave */}
      <div className="absolute inset-0">
        <svg
          className="w-full h-full opacity-30"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#4F46E5"
            fillOpacity="0.2"
            d="M0,192L80,181.3C160,171,320,149,480,149.3C640,149,800,171,960,165.3C1120,160,1280,128,1360,112L1440,96L1440,320L0,320Z"
          />
        </svg>
      </div>

      {/* blobs */}
      <div className="absolute w-72 h-72 bg-blue-400/20 rounded-full blur-3xl top-10 left-10" />
      <div className="absolute w-72 h-72 bg-purple-400/20 rounded-full blur-3xl bottom-10 right-10" />
    </>
  );
}