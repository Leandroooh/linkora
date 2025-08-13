import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { Trash2 } from 'lucide-react';
import { type FormEvent, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { db } from '../services/fireBaseConnection';
import type { LinkProps } from './types/LinksProps';

export function AdminPage() {
  // Link Data
  const [linkInput, setLinkInput] = useState('');
  const [titleInput, setTitleInput] = useState('');

  const [links, setLinks] = useState<LinkProps[]>([]);

  // Color Picker
  const [textColorInput, setTextColorInput] = useState('#000000');
  const [backgroundColorInput, setBackgroundColorInput] = useState('#FFFFFF');

  useEffect(() => {
    const linksref = collection(db, 'links');
    const queryRef = query(linksref, orderBy('createdAt'));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const list = [] as LinkProps[];

      for (const link of snapshot.docs) {
        const data = link.data();

        list.push({
          id: link.id,
          name: data.name,
          url: data.url,
          bg: data.bg,
          color: data.color,
        });
      }

      setLinks(list);
    });

    return () => {
      unsub();
    };
  }, []);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (titleInput === '' || linkInput === '') {
      throw new Error('All Fields necessary!');
    }

    try {
      await addDoc(collection(db, 'links'), {
        name: titleInput,
        url: linkInput,
        bg: backgroundColorInput,
        color: textColorInput,
        createdAt: new Date(),
      });

      setLinkInput('');
      setTitleInput('');

      //  biome-ignore lint/suspicious/noConsole: devMode
      console.log('Cadastrado com sucesso!');
    } catch (error) {
      if (error && typeof error === 'object' && 'message' in error) {
        //  biome-ignore lint/suspicious/noConsole: devMode
        console.error('Erro:', error.message);
      }
      // biome-ignore lint/suspicious/noConsole: devMode
      console.error('Erro desconhecido:', error);
    }
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, 'links', id);
    await deleteDoc(docRef);
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4 pb-7">
      <Header />

      <form
        className="m-9 flex w-full max-w-xl flex-col"
        onSubmit={handleRegister}
      >
        <label
          className="mt-4 mb-4 font-medium text-white"
          htmlFor="input-title"
        >
          Título do Link
        </label>
        <Input
          id="input-title"
          onChange={(e) => setTitleInput(e.target.value)}
          placeholder="Informe o Título da URL..."
          type="text"
          value={titleInput}
        />

        <label className="mt-4 mb-4 font-medium text-white" htmlFor="input-url">
          Endereço do Link
        </label>

        <Input
          id="input-url"
          onChange={(e) => setLinkInput(e.target.value)}
          placeholder="Informe o Endereço da URL..."
          type="url"
          value={linkInput}
        />

        <section className="m-auto mt-4 flex max-w-2xs flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center">
            <Input
              className="h-12 w-12 border-0"
              id="input-textcolor"
              onChange={(e) => setTextColorInput(e.target.value)}
              type="color"
              value={textColorInput}
            />
            <label className="font-medium text-white" htmlFor="input-textcolor">
              Cor do Texto
            </label>
          </div>

          <div className=" flex flex-col items-center">
            <Input
              className="h-12 w-12 border-0"
              id="input-background"
              onChange={(e) => setBackgroundColorInput(e.target.value)}
              type="color"
              value={backgroundColorInput}
            />
            <label
              className="font-medium text-white"
              htmlFor="input-background"
            >
              Cor do Background
            </label>
          </div>
        </section>

        {titleInput && (
          <div className="mt-9 mb-7 flex h-40 flex-col items-center justify-center rounded-md border border-gray-100/25">
            <label className=" mb-2 font-medium text-white" htmlFor="input">
              Pré-Visualização
            </label>
            <article
              className="mt-6 flex h-12 w-11/13 max-w-lg flex-col items-center justify-between rounded bg-zinc-900 px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                background: backgroundColorInput,
              }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>
                {titleInput}
              </p>
            </article>
          </div>
        )}

        <button
          className="mt-6 mb-9 flex h-9 items-center justify-center gap-4 rounded-md bg-blue-500 font-medium text-white uppercase transition-transform hover:scale-105"
          type="submit"
        >
          Cadastrar
        </button>
      </form>

      {links.length > 0 &&
        links.map((link) => {
          return (
            <article
              className="mb-2 flex w-11/12 max-w-xl select-none items-center justify-between rounded bg-blue-500 px-4 py-3 transition-transform hover:scale-110 hover:cursor-pointer"
              key={link.id}
              style={{ background: link.bg, color: link.color }}
            >
              <p className="font-medium text-white">{link.name}</p>
              <div className="flex items-center">
                <button
                  className="cursor-pointer transition-transform hover:scale-115"
                  onClick={() => handleDeleteLink(link.id)}
                  title="links-controller"
                  type="button"
                >
                  <Trash2
                    className=" h-6 w-6 rounded bg-neutral-950 p-1 "
                    color="#FFF"
                    size={18}
                  />
                </button>
              </div>
            </article>
          );
        })}
    </div>
  );
}
