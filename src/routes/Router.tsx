import React, { FC, FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';

import { Layout } from '~/components/common/layout/Layout';

type RouterType = {
    path: string;
    element: FunctionComponent;
};

export const Router: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {routes.map((route: RouterType, index) => (
                    <Route key={index} path={route.path} element={<route.element />} />
                ))}
            </Route>
        </Routes>
    );
};
