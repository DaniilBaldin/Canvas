import styled from 'styled-components';

export const Form = styled.form`
    height: 6rem;
    width: 80%;
    max-width: 80%;
    text-align: center;
    /* position: relative; */
    margin-left: 2rem;
    margin-bottom: 20px;
`;

export const Label = styled.label`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: right;
`;

export const LabelText = styled.p`
    color: black;
    font-family: sans-serif;
    font-size: 15px;
    text-align: left;
    font-weight: 600;
    margin-bottom: 10px;
`;

export const Input = styled.input`
    border: 1px solid blue;
    height: 2rem;
    border-radius: 5px;
    padding-left: 10px;
`;

export const Button = styled.button`
    width: 100%;
    margin-top: 10px;
    border: 1px solid blue;
    height: 2rem;
    border-radius: 5px;
    background-color: blue;
    color: white;
    margin-bottom: 20px;
`;
