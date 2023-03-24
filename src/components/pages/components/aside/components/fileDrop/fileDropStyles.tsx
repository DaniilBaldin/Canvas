import styled from 'styled-components';

export const Form = styled.form`
    height: 10rem;
    width: 80%;
    max-width: 80%;
    text-align: center;
    position: relative;
    margin-left: 2rem;
`;

export const InputFile = styled.input`
    display: none;
`;

export const Label = styled.label`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px dashed blue;
    border-radius: 5px;
    background-color: lightblue;
    margin-top: 20px;
`;

export const Text = styled.p`
    font-size: 20px;
    font-family: sans-serif;
    font-weight: 400;
    color: black;
    margin: 0;
`;

export const FileElement = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 1px solid black;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;
