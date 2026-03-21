import React from 'react';

// --- Desktop breakpoint hook ---
export default function useIsWide(breakpoint = 900) {
  const [wide, setWide] = React.useState(
    () => typeof window !== 'undefined' && window.innerWidth >= breakpoint
  );
  React.useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const handler = (e) => setWide(e.matches);
    mq.addEventListener('change', handler);
    setWide(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);
  return wide;
}
