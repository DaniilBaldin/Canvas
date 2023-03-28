import styled from 'styled-components';

export const Area = styled.div`
    margin-top: 20px;
    width: 90%;
`;

export const Text = styled.p`
    color: black;
    font-family: sans-serif;
    font-size: 15px;
    text-align: left;
    font-weight: 600;
    margin-top: 0;
    margin-left: 2rem;
    margin-bottom: 10px;
`;

export const Images = styled.div`
    margin-left: 10px;
    display: grid;
    grid-template-columns: 50% 50%;
`;

export const Image = styled.img`
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
        cursor: move;
    }
`;
