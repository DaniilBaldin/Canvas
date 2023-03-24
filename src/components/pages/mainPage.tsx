import React from 'react';

import { Aside } from './components/aside/Aside';
import { Canvas } from './components/canvas/Canvas';

import { Main } from './mainPageStyles';

export const mainPage = () => {
    return (
        <Main>
            <Aside />
            <Canvas />
        </Main>
    );
};
