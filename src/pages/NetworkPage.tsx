import { doc, getDoc, setDoc } from 'firebase/firestore';
import { type FormEvent, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { db } from '../services/fireBaseConnection';

export function NetworkPage() {
  const [youtube, setYoutube] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');

  useEffect(() => {
    async function loadSocialLinks() {
      try {
        const docRef = doc(db, 'social', 'link');
        const docSnap = await getDoc(docRef);

        if (docSnap.data === undefined) {
          return;
        }

        setYoutube(docSnap.data()?.youtube);
        setFacebook(docSnap.data()?.facebook);
        setInstagram(docSnap.data()?.instagram);
      } catch (error) {
        if (error && typeof error === 'object' && 'message' in error) {
          //  biome-ignore lint/suspicious/noConsole: devMode
          console.error('Erro:', error.message);
        }
        // biome-ignore lint/suspicious/noConsole: devMode
        console.error('Erro desconhecido:', error);
      }
    }

    loadSocialLinks();
  }, []);

  async function handleSocialRegister(e: FormEvent) {
    e.preventDefault();

    try {
      await setDoc(doc(db, 'social', 'link'), {
        youtube,
        facebook,
        instagram,
      });

      setYoutube('');
      setFacebook('');
      setInstagram('');
    } catch (error) {
      if (error && typeof error === 'object' && 'message' in error) {
        //  biome-ignore lint/suspicious/noConsole: devMode
        console.error('Erro:', error.message);
      }
      // biome-ignore lint/suspicious/noConsole: devMode
      console.error('Erro desconhecido:', error);
    }
  }
  return (
    <div className="flex min-h-screen flex-col items-center px-2 pb-7">
      <h1>Redes Sociais</h1>

      <Header />

      <form
        action="#"
        className="mt-8 mb-4 flex w-full max-w-xl flex-col"
        onSubmit={handleSocialRegister}
      >
        <label className="mt-2 mb-2 font-medium text-white" htmlFor="input">
          Instagram
        </label>
        <Input
          onChange={(e) => setInstagram(e.target.value)}
          placeholder="Digite sua URL..."
          type="url"
          value={instagram}
        />

        <label className="mt-2 mb-2 font-medium text-white" htmlFor="input">
          Facebook
        </label>
        <Input
          onChange={(e) => setFacebook(e.target.value)}
          placeholder="Digite sua URL..."
          type="url"
          value={facebook}
        />

        <label className="mt-2 mb-2 font-medium text-white" htmlFor="input">
          Youtube
        </label>
        <Input
          onChange={(e) => setYoutube(e.target.value)}
          placeholder="Digite sua URL..."
          type="url"
          value={youtube}
        />

        <button
          className="mt-5 mb-7 flex h-10 items-center justify-center rounded-md bg-blue-600 font-medium text-white"
          type="submit"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
