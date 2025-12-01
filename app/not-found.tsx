import Link from 'next/link';
import NavBar from '@/components/navBar/page';

export default function NotFound() {
  return (
    <div className='text-primary_light'>
      <NavBar />
      <div className="w-svw h-screen flex flex-col items-center justify-center bg-primary_dark">
        <h1 className="text-4xl font-bold">Page not found</h1>
        <Link className="underline mt-4" href="/">Return home</Link>
      </div>
    </div>
  );
}
