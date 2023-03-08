import { Route, Routes, Navigate } from 'react-router-dom';
import { RouterPath } from 'routers/router-path';
import { HomePage } from 'pages/home-page';

export function GuestRouter() {
  const routers = [
    {
      path: RouterPath.home,
      component: <HomePage />,
    },
  ];

  return (
    <Routes>
      {routers.map((router) => (
        <Route
          key={router.path.toString()}
          path={router.path}
          element={router.component}
        />
      ))}
      <Route path="*" element={<Navigate to={RouterPath.home} replace />} />
    </Routes>
  );
}
