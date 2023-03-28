import React, { useEffect, useRef, useState } from 'react';
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
    type: string;
};
type Image = {
    src: string;
    x: number;
    y: number;
    width: number;
    height: number;
    type: string;
};

export const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const enableDrop = (event: React.DragEvent<HTMLCanvasElement>) => {
        event.preventDefault();
    };
    const cnvs = canvasRef.current;
    let img: ConcatArray<Image>;

    const [images, setImages] = useState<Image[]>([]);
    const [texts, setTexts] = useState<Text[]>([]);

    const state = Selector(imageSelector);
    const lastItem = state.slice(-1);
    const source = lastItem[0].image.src.split('/').reverse()[0];
    const pageX = lastItem[0].image.x;
    const pageY = lastItem[0].image.y;

    const stateText = Selector(textSelector);
    const lastText = stateText.slice(-1);
    const text = lastText[0].texts.text;

    if (cnvs) {
        img = [
            {
                src: source,
                x: pageX - cnvs.offsetLeft,
                y: pageY - cnvs.offsetTop * 2,
                width: 150,
                height: 150,
                type: 'image',
            },
        ];
    }

    useEffect(() => {
        setImages(images.concat(img));
    }, [state]);

    const txt = [{ text: text, x: 20, y: 50, width: 100, height: 16, type: 'text' }];

    useEffect(() => {
        setTexts(texts.concat(txt));
    }, [stateText]);

    const draw = () => {
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
            if (texts[i].text) {
                const t = texts[i];
                context.font = '24px serif';

                context.fillText(t.text, t.x, t.y);
            }
        }
        images.forEach((image: Image) => {
            if (image.src) {
                const img = new Image(150, 150);
                img.src = `/${image.src}`;

                context.drawImage(img, image.x, image.y, 150, 150);

                img.ondragstart = () => {
                    return false;
                };
            }
        });
    };

    let selectedText = -1;
    let selectedImage = -1;
    let startX: number;
    let startY: number;

    const textHit = (x: number, y: number, itemIndex: number) => {
        const t = texts[itemIndex];
        if (t.text) {
            return x >= t.x && x <= t.x + t.width && y >= t.y - t.width && y <= t.y;
        }
    };
    const imageHit = (x: number, y: number, itemIndex: number) => {
        const i = images[itemIndex];
        if (i.src) {
            return x >= i.x && x <= i.x + i.width && y >= i.y - i.width;
        }
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
        for (let i = 0; i < images.length; i++) {
            if (imageHit(startX, startY, i)) {
                selectedImage = i;
            }
        }
    };
    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement> | undefined) => {
        if (!e) return;
        e.preventDefault();

        selectedText = -1;
        selectedImage = -1;
    };

    const handleMouseOut = (e: React.MouseEvent<HTMLCanvasElement> | undefined) => {
        if (!e) return;
        e.preventDefault();

        selectedText = -1;
        selectedImage = -1;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement> | undefined) => {
        if (!e) return;
        if (selectedText < 0 && selectedImage < 0) return;
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
        const i = images[selectedImage];

        if (selectedText > 0) {
            t.x += dX;
            t.y += dY;
        }
        if (selectedImage > 0) {
            i.x += dX;
            i.y += dY;
        }
        draw();
    };

    draw();

    return (
        <CanvasMain
            id="canvas"
            width={1200}
            height={700}
            ref={canvasRef}
            onDragOver={enableDrop}
            onMouseDown={handleMouseDown}
            onMouseOut={handleMouseOut}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            // onMouseEnter={}
            // style={{ cursor: 'pointer' }}
        />
    );
};
