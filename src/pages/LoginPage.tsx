import { signInWithEmailAndPassword } from 'firebase/auth';
import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { auth } from '../services/fireBaseConnection';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email === '' || password === '') {
      alert('Preencha todos os campos para realizar seu login!');
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      navigate('/admin', { replace: true });
      // biome-ignore lint/suspicious/noConsole: DevMode
      console.log('Success login!');

      return result;
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: DevMode
      console.log(`Erro: ${error}`);
    }

    // biome-ignore lint/suspicious/noConsole: DevMode
    console.log({ email, password });
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center ">
      <Link to={'/'}>
        <h1 className="mt-11 mb-7 font-bold text-5xl text-white">
          Link
          <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Ora
          </span>
        </h1>
      </Link>

      <form className="flex w-full max-w-xl flex-col" onSubmit={handleSubmit}>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Informe seu e-mail"
          type="email"
          value={email}
        />

        <Input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha..."
          type="password"
          value={password}
        />

        <button
          className="h-9 rounded border-0 bg-blue-700 font-bold text-lg text-white uppercase"
          type="submit"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
