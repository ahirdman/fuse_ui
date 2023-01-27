import '../styles/global.css';
import { Mulish } from '@next/font/google';

const mulish = Mulish({
  variable: '--font-mulish',
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${mulish.variable} font-sans`}>
      <head />
      <body>{children}</body>
    </html>
  );
}
