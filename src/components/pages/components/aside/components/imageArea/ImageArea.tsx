import React, { DragEventHandler, useEffect, useState } from 'react';

import { Dispatch } from '~/store/hooks';
import { addImage } from '~/store/reducers/imageReducer';

import { Arts } from '~/utils/arts';

import { Area, Text, Images, Image } from './imageAreaStyles';

interface Image {
    index: number;
    src: string;
    alt: string;
}

type imageInfo = {
    src: string;
};

export const ImageArea = () => {
    const dispatch = Dispatch();

    const [info, setInfo] = useState<imageInfo>({
        src: '',
    });

    const handleDrag: DragEventHandler<HTMLImageElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!e) {
            return;
        }
        if (e.type === 'drag') {
            const imageInfo: imageInfo = {
                src: (e.target as HTMLImageElement).src,
            };
            setInfo(imageInfo);
        }
    };

    useEffect(() => {
        dispatch(addImage({ image: info }));
    }, [info]);

    return (
        <Area>
            <Text>Images</Text>
            <Images>
                {Arts.map((e: Image) => (
                    <Image
                        onDrag={handleDrag}
                        key={e.index}
                        src={e.src}
                        alt={e.alt}
                        width={150}
                        height={150}
                        draggable="true"
                    />
                ))}
            </Images>
        </Area>
    );
};
