import type { ReactNode } from 'react';

interface SocialProps {
  url: string;
  icon: ReactNode;
}

export function SocialComponent({ url, icon }: SocialProps) {
  return (
    <a
      className=" text-white transition-transform hover:scale-125"
      href={url}
      target="_blank"
    >
      {icon}
    </a>
  );
}
