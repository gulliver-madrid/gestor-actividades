/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import '../../__mocks__/matchMedia.mock';
import { fireEvent, render, screen } from '@testing-library/react';
import {
    Result,
    UsuarioConId,
    AllActivities,
    toAllActivites,
    createOk,
} from '../../model';

import App from '../../renderer/App';
import { createActivityWithId } from '../helpers';

// Establecemos variable de entorno
process.env.testing = '1';

jest.mock('../../renderer/actions/actions', () => {
    return {
        leerProyectos: jest.fn(() => Promise.resolve([])),
        leerUsuarios: jest.fn(
            (): Promise<Result<UsuarioConId[]>> => Promise.resolve(createOk([]))
        ),
        guardarActividades: jest.fn(() => Promise.resolve([])),
        leerActividades: jest.fn(
            (): Promise<Result<AllActivities>> =>
                Promise.resolve(
                    createOk(
                        toAllActivites([1, 2, 3, 4].map(createActivityWithId))
                    )
                )
        ),
        logMsg: jest.fn(),
        getVersion: jest.fn(),
        readCurrentZoom: jest.fn(() => Promise.resolve(100)),
    };
});

const ACTIVITY_TITLE = createActivityWithId(1).titulo;

describe('App', () => {
    it('should render activities', async () => {
        expect(render(<App />)).toBeTruthy();

        const button = await screen.findByText(/Ver actividades/i);
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        const items = await screen.findAllByText('Actividades');
        items.forEach((item) => expect(item).toBeInTheDocument());
        expect(
            await screen.findByText('No hay filtros activos (4 actividades)')
        ).toBeInTheDocument();
        expect(
            await screen.findByText(new RegExp(`.*${ACTIVITY_TITLE}`))
        ).toBeInTheDocument();

        // Mostramos filtros
        const toggleFiltersButton = await screen.findByText('Mostrar filtros');
        fireEvent.click(toggleFiltersButton);

        const filterSideBarTitle = await screen.findByText(/^Filtros$/i);
        expect(filterSideBarTitle).toBeInTheDocument();
        const statusFilterTag = await screen.findByLabelText(/activa/i);
        fireEvent.click(statusFilterTag);
        await screen.findByText(/Filtrando/i);
    });
});

describe('App', () => {
    it('should render users', async () => {
        expect(render(<App />)).toBeTruthy();
        const button = await screen.findByText(/Ver usuarios/i);
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        const items = await screen.findAllByText('Usuarios');
        items.forEach((item) => expect(item).toBeInTheDocument());
    });
});
