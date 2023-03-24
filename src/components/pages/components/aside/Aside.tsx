import React from 'react';

import { FileDropArea } from './components/fileDrop/FileDropArea';
import { TextInput } from './components/textInput/TextInput';
import { ImageArea } from './components/imageArea/ImageArea';

import { AsideMain, AsideHeader, Line } from './asideStyles';

export const Aside = () => {
    return (
        <AsideMain>
            <AsideHeader>Upload image</AsideHeader>
            <Line />
            <FileDropArea />
            <AsideHeader>Assets</AsideHeader>
            <Line />
            <TextInput />
            <ImageArea />
        </AsideMain>
    );
};
