import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SocialComponent } from '../components/Social';
import { db } from '../services/fireBaseConnection';
import type { LinkProps } from './types/LinksProps';
import type { SocialLinksProps } from './types/SocialProps';

export function HomePage() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

  useEffect(() => {
    async function handleGetLinks() {
      const linksRef = collection(db, 'links');
      const queryRef = query(linksRef, orderBy('createdAt'));

      const linksList: LinkProps[] = [];
      const linksSnap = await getDocs(queryRef);

      for (const data of linksSnap.docs) {
        linksList.push({
          id: data.id,
          ...data.data(),
        } as LinkProps);
      }
      setLinks(linksList);
    }

    handleGetLinks();
  }, []);

  useEffect(() => {
    async function handleGetSocialLinks() {
      const docRef = doc(db, 'social', 'link');
      const docSnap = await getDoc(docRef);

      if (docSnap.data === undefined) {
        return;
      }

      const data = docSnap.data();

      setSocialLinks({
        instagram: data?.instagram,
        youtube: data?.youtube,
        facebook: data?.facebook,
      });
    }

    handleGetSocialLinks();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center py-4">
      <h1 className="mt-20 font-bold text-3xl text-white md:text-4xl">
        Página Inicial
      </h1>
      <span className="mt-5 mb-5 text-gray-50">Veja Meus Links</span>

      <main className="mt-5 flex w-11/13 max-w-xl flex-col text-center ">
        {links.map((link) => (
          <section
            className=" mb-4 flex h-12 cursor-pointer select-none items-center justify-center rounded-lg bg-purple-700 text-white transition-transform hover:scale-110"
            key={link.id}
            style={{ background: link.bg }}
          >
            <a href={link.url} target="_blank">
              <p className="text-base md:text-lg" style={{ color: link.color }}>
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="my-4 flex items-center justify-center gap-3">
            <div className="flex gap-5">
              <SocialComponent
                icon={<Facebook size={36} />}
                url={socialLinks.facebook}
              />
              <SocialComponent
                icon={<Instagram size={36} />}
                url={socialLinks.instagram}
              />
              <SocialComponent
                icon={<Youtube size={36} />}
                url={socialLinks.youtube}
              />
            </div>
          </footer>
        )}
      </main>
    </div>
  );
}
