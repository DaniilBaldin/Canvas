import React, { useEffect, useRef } from 'react';
import { Selector } from '~/store/hooks/hooks';
import { imageSelector } from '~/store/selectors/imageSelector';
import { textSelector } from '~/store/selectors/textSelector';

import { CanvasMain } from './canvasStyles';

type Text = {
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
};

export const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const enableDrop = (event: React.DragEvent<HTMLCanvasElement>) => {
        event.preventDefault();
    };

    const texts: Text[] = [];

    const state = Selector(imageSelector);
    const stateText = Selector(textSelector);
    const lastText = stateText.slice(-1);
    const lastItem = state.slice(-1);
    const source = lastItem[0].image.src.split('/').reverse()[0];
    const text = lastText[0].texts.text;
    texts.push({ text: text, x: 10, y: 30, width: 100, height: 16 });

    let selectedText = -1;
    let startX: number;
    let startY: number;

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
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const context = canvas.getContext('2d');
        if (!context) {
            return;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < texts.length; i++) {
            const t = texts[i];
            context.font = '24px serif';

            context.fillText(t.text, t.x, t.y);
        }
    };

    const textHit = (x: number, y: number, textIndex: number) => {
        const t = texts[textIndex];
        return x >= t.x && x <= t.x + t.width && y >= t.y - t.width && y <= t.y;
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement> | undefined) => {
        if (!event) return;
        event.preventDefault();
        const canvas = canvasRef.current;
        if (!canvas) return;
        startX = event.clientX - canvas.offsetLeft;
        startY = event.clientY - canvas.offsetTop;

        for (let i = 0; i < texts.length; i++) {
            if (textHit(startX, startY, i)) {
                selectedText = i;
            }
        }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement> | undefined) => {
        if (!e) return;
        e.preventDefault();
        selectedText = -1;
    };

    const handleMouseOut = (e: React.MouseEvent<HTMLCanvasElement> | undefined) => {
        if (!e) return;
        e.preventDefault();
        selectedText = -1;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement> | undefined) => {
        if (!e) return;
        if (selectedText < 0) return;
        e.preventDefault();
        const canvas = canvasRef.current;
        if (!canvas) return;
        const mouseX = e.clientX - canvas.offsetLeft;
        const mouseY = e.clientY - canvas.offsetTop;

        const dX = mouseX - startX;
        const dY = mouseY - startY;
        startX = mouseX;
        startY = mouseY;

        const t = texts[selectedText];
        t.x += dX;
        t.y += dY;
        handleText();
    };

    useEffect(() => {
        handleText();
    }, [text]);

    return (
        <CanvasMain
            id="canvas"
            width={1200}
            height={700}
            ref={canvasRef}
            onDragOver={enableDrop}
            onDrop={handleDrop}
            onMouseDown={handleMouseDown}
            onMouseOut={handleMouseOut}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        />
    );
};
