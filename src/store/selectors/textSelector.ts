import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const textSelector = createSelector(
    (state: RootState) => state.images.texts,
    (items) => items,
);
