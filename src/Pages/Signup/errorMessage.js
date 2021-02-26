import React from "react";

export default function ErrorMessage({ error }) {
    if (error) {
        switch (error.type) {
            case "required":
                return <p className={'input-error'}>Dit is een vereist veld.</p>;
            case "minLength":
                return <p className={'input-error'}>Dit veld dient ten minste 2 karakters langs te zijn.</p>;
            case "pattern":
                return <p className={'input-error'}>Enter a valid email address</p>;
            case "min":
                return <p className={'input-error'}>Minmium age is 18</p>;
            case "validate":
                return <p className={'input-error'}>Username is already used</p>;
            case "maxLength":
                return <p className={'input-error'}>Dit veld mag maar 50 karakters lang zijn.</p>;
            default:
                return null;
        }
    }

    return null;
}
