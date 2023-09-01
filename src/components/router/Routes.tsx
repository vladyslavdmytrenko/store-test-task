import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';

import { Spinner } from '@components/Spinner';
import { router } from '.';

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
