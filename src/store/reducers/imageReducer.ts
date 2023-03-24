import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Image = {
    src: string;
};

type Text = {
    text: string;
};

type Images = {
    image: Image;
};

type Texts = {
    texts: Text;
};

type InitState = {
    images: Images[];
    texts: Texts[];
};

const initialImage: InitState = {
    images: [
        {
            image: {
                src: '',
            },
        },
    ],
    texts: [
        {
            texts: {
                text: '',
            },
        },
    ],
};

export const imageReducer = createSlice({
    name: 'image',
    initialState: initialImage,
    reducers: {
        addImage(state: InitState, action: PayloadAction<Images>) {
            state.images.push(action.payload);
        },
        addText(state: InitState, action: PayloadAction<Texts>) {
            state.texts.push(action.payload);
        },
    },
});

export const { addImage, addText } = imageReducer.actions;

export default imageReducer.reducer;
