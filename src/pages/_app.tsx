import type {AppProps} from 'next/app'

import {useEffect, useState} from "react";
import {useMessageStore} from "@/store/MessageStore";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import '@/styles/globals.scss'
import {fetchFromLocalStorage} from "@/helpers/fetchFromLocalStorage";


export default function App({Component, pageProps}: AppProps) {
    const [loading, setLoading] = useState<boolean>(true);

    const [setMessages] = useMessageStore(state => [state.setMessages])


    useEffect(() => {
        setLoading(true)
        fetchFromLocalStorage().then(r => {
            setMessages(r)
            setLoading(false)
        }).catch(e => setLoading(false)).finally(() => setLoading(false))
    }, [setMessages])


    if (loading) {
        return null
    }

    return <Component {...pageProps} />
}
