import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const imageSelector = createSelector(
    (state: RootState) => state.images.images,
    (items) => items,
);
