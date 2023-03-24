import React, { ChangeEventHandler, DragEventHandler, useState } from 'react';

import { Form, InputFile, Label, Text, FileElement } from './fileDropStyles';

export const FileDropArea = () => {
    const [dragActive, setDragActive] = useState<boolean>(false);

    const handleDrag: DragEventHandler<HTMLFormElement | HTMLDivElement> | undefined = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop: DragEventHandler<HTMLDivElement> | undefined = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            console.log(e.dataTransfer.files);
        }
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files);
        }
    };

    return (
        <Form
            onDragEnter={handleDrag}
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <InputFile type="file" multiple={true} id="file-input" onChange={handleChange} />
            <Label htmlFor="file-input">
                <Text>Drop file or click to upload</Text>
                <Text>.png, .jpeg</Text>
            </Label>
            {dragActive && (
                <FileElement
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                ></FileElement>
            )}
        </Form>
    );
};
