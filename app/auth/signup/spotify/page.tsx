'use client';

export default function AuthenticateSpotify() {
  const handleClick = () => {
    console.log('click');
  };

  return (
    <div>
      <button onClick={handleClick} className="bg-orange-500">
        Sign in with Spotify
      </button>
    </div>
  );
}
