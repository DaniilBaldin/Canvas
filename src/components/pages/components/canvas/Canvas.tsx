import React, { useEffect, useRef } from 'react';
import { Selector } from '~/store/hooks';

import { CanvasMain } from './canvasStyles';

export const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const enableDrop = (event: React.DragEvent<HTMLCanvasElement>) => {
        event.preventDefault();
    };

    const state = Selector((state) => state.images.images);
    const stateText = Selector((state) => state.images.texts);
    const lastText = stateText.slice(-1);
    const lastItem = state.slice(-1);
    const source = lastItem[0].image.src.split('/').reverse()[0];
    const text = lastText[0].texts.text;

    const handleDrop = (e: React.DragEvent<HTMLCanvasElement> | undefined) => {
        if (!e) {
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const context = canvas.getContext('2d');
        if (!context) {
            return;
        }
        const image = new Image(150, 150);
        image.src = `/${source}`;

        const vX = e.pageX - 590;
        const vY = e.pageY - 180;

        image.onload = () => {
            context.drawImage(image, vX, vY, 150, 150);
        };
        image.ondragstart = () => {
            return false;
        };
    };

    const handleText = () => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.font = '24px serif';

        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    };

    useEffect(() => {
        handleText();
    }, [text]);

    return (
        <CanvasMain id="canvas" width={1200} height={700} ref={canvasRef} onDragOver={enableDrop} onDrop={handleDrop} />
    );
};
