import toast from 'react-hot-toast';

export const GhostToast = ({
  message,
  type = 'ok',
  duration = 3000,
}: {
  message: string;
  type?: 'ok' | 'error';
  duration?: number;
}) => {
  if (type === 'ok') {
    return toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } bg-zinc-800 text-zinc-50 border-1 border-zinc-900 rounded-md p-2`}
        >
          <h1 className="text-base">{message}</h1>
        </div>
      ),
      {
        duration: 3000,
        id: 'logout-toast',
        position: 'top-center',
      },
    );
  } else {
    return toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } bg-red-700 text-zinc-50 border-1 border-zinc-600 rounded-md p-2`}
        >
          <h1 className="text-base">{message}</h1>
        </div>
      ),
      {
        duration,
        id: 'logout-toast',
        position: 'top-center',
      },
    );
  }
};
