import React, { useEffect, useState } from 'react';
import { Dispatch } from '~/store/hooks';
import { addText } from '~/store/reducers/imageReducer';

import { Form, Label, LabelText, Input, Button } from './textInputStyles';

type Text = {
    text: string;
};

export const TextInput = () => {
    const dispatch = Dispatch();
    const [value, setValue] = useState<Text>({
        text: '',
    });
    const [text, setText] = useState<Text>({
        text: '',
    });

    const inputChangeHandler = (event: { target: { value: React.SetStateAction<string> } }) => {
        const text = event.target.value as string;
        setValue({ text: text });
    };

    const formSubmitHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setText(value);
    };
    useEffect(() => {
        dispatch(addText({ texts: value }));
    }, [text]);

    return (
        <Form onSubmit={formSubmitHandler}>
            <Label>
                <LabelText>Text</LabelText>
                <Input
                    type="text"
                    autoComplete="off"
                    minLength={2}
                    maxLength={20}
                    onChange={inputChangeHandler}
                ></Input>
            </Label>
            <Button>Add text</Button>
        </Form>
    );
};
