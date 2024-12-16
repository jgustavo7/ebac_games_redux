import { PreloadedState } from '@reduxjs/toolkit'
import { RenderOptions, render } from "@testing-library/react";

import { PropsWithChildren } from 'react';

import { AppStore, RootState, configuraStore } from '../store'
import { Provider } from 'react-redux';


interface ExtenderRenderOptions extends Omit<RenderOptions, 'queries'>{
    preloadedState?: PreloadedState<RootState>;
    store ?: AppStore
}

export function renderizaComProvider(
    elemento: React.ReactElement, 
    {
        preloadedState = {},
        store = configuraStore(preloadedState), 
        ...opcoesAdicionais
    }: ExtenderRenderOptions = {}
) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    function Encapsulador({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }

    return {
        store,
        ...render(elemento, {
            wrapper: Encapsulador,
            ...opcoesAdicionais
        })
    }
}