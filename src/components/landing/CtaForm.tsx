import { useState } from 'react';
import { ctaButtonText, ctaPlaceholderText } from '@/constants';
import { GhostToast } from '../utils/GhostToast';

export const CtaForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(true);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return GhostToast({ message: 'Email no válido', type: 'error' });
    setLoading(true);

    try {
      const response = await fetch(`api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setLoading(false);
        setActiveButton(false);
        setEmail('');
        GhostToast({ message: 'Suscrito correctamente' });
      } else {
        if (response.status === 409) {
          try {
            const response = await fetch(`api/subscribe`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
            });
            if (response.ok) {
              setLoading(false);
              setActiveButton(false);
              setEmail('');
              const data = await response.json();
              if (data.message === 'Already subscribed') {
                return GhostToast({
                  message: 'Ya estabas suscrito',
                });
              }
              GhostToast({ message: 'Suscrito correctamente' });
              return;
            } else {
              setLoading(false);
              return GhostToast({
                message: 'Hubo un error, intenta de nuevo mas tarde',
                type: 'error',
              });
            }
          } catch (error) {
            GhostToast({
              message: 'Hubo un error, intenta de nuevo mas tarde',
              type: 'error',
            });
            setLoading(false);
            console.error(error);
          }
        } else if (response.status === 401) {
          GhostToast({ message: 'Email no válido', type: 'error' });
        } else {
          GhostToast({
            message: 'Hubo un error, intenta de nuevo mas tarde',
            type: 'error',
          });
        }
        setLoading(false);
      }
    } catch (error) {
      GhostToast({
        message: 'Hubo un error, intenta de nuevo mas tarde',
        type: 'error',
      });
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <form action="" className="mt-12" onSubmit={handleSubmit}>
      <div className="flex w-full flex-col gap-1 sm:flex-row max-w-md mx-auto">
        <input
          name="email"
          type="email"
          className="block w-full rounded-full border border-zinc-900 px-4 py-2 font-spline text-sm font-medium text-zinc-100 placeholder-zinc-400 focus:border-zinc-800 focus:outline-none focus:ring-2 h-10 lg:px-6 focus:ring-zinc-700/50 bg-zinc-800 disabled:opacity-50"
          placeholder={ctaPlaceholderText}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          disabled={loading || !activeButton}
          type="submit"
          className="items-center inline-flex border duration-300 focus:ring-2 h-10 focus:ring-offset-2 justify-center px-4 py-2 rounded-full text-sm bg-white border-transparent focus:ring-black hover:bg-white/10 hover:text-white ring-1 ring-transparent text-black"
        >
          {ctaButtonText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="ml-2 h-auto w-4"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </form>
  );
};
