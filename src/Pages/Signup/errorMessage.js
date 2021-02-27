import React from "react";

export default function ErrorMessage({ error }) {
    if (error) {
        switch (error.type) {
            case "required":
                return <p className={'input-error'}>Dit is een vereist veld.</p>;
            case "minLength":
                return <p className={'input-error'}>Dit veld dient meer karakters te hebben.</p>;
            case "pattern":
                return <p className={'input-error'}>Vul een geldig e-mail adres in.</p>;
            case "maxLength":
                return <p className={'input-error'}>Dit veld mag maar 50 karakters lang zijn.</p>;
            default:
                return null;
        }
    }
    return null;
}