import { signOut } from 'firebase/auth';
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth } from '../services/fireBaseConnection';

async function handleLogout() {
  await signOut(auth);
}

const hoverStyle = 'transition-transform hover:scale-105';

export function Header() {
  return (
    <header className="mt-4 flex w-full max-w-2xl px-1.5">
      <nav className="flex h-12 w-full justify-between gap-4 rounded-md bg-white px-5">
        <div className=" flex items-center gap-4 font-medium">
          <Link className={hoverStyle} to={'/'}>
            Home
          </Link>

          <Link className={hoverStyle} to={'/admin'}>
            Links
          </Link>

          <Link className={hoverStyle} to={'/admin/social'}>
            Redes Sociais
          </Link>
        </div>
        <button onClick={handleLogout} type="submit">
          <LogOut color="#DB2629" size={26} />
        </button>
      </nav>
    </header>
  );
}
