/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ParticipantFilter from '../../renderer/pages/Activities/FilterSideBar/ParticipantFilter';

import { IdUsuario } from '../../model';
import { allow } from '../../helpers';

describe('ParticipantFilter', () => {
    test('should display filter title correctly', async () => {
        expect(
            render(
                <ParticipantFilter
                    updateParticipant={jest.fn()}
                    users={[]}
                    filters={{
                        byName: '',
                        projects: [],
                        status: [],
                        version: 0,
                    }}
                />
            )
        ).toBeTruthy();

        expect(await screen.findByText('Participante:')).toBeInTheDocument();
    });

    test('should display select options correctly', async () => {
        const users = [
            {
                id: '1' as IdUsuario,
                nombre: 'User 1',
                apellidos: 'Apellidos 1',
            },
            {
                id: '2' as IdUsuario,
                nombre: 'User 2',
                apellidos: 'Apellidos 2',
            },
        ];
        const userFilter = users[1];
        const expectedOptionIndex = '2';
        const filters = {
            byName: '',
            user: userFilter,
            projects: [],
            status: [],
            version: 0,
        };
        const { container } = render(
            <ParticipantFilter
                users={users}
                filters={filters}
                updateParticipant={jest.fn()}
            />
        );

        const selectFilterTitle = await screen.findByText('Participante:');

        allow(selectFilterTitle);
        const selectFilter = container.querySelector(
            'select[name="participantes"]'
        ) as HTMLSelectElement;
        expect(selectFilter).toBeInTheDocument();
        expect(selectFilter.value).toBe(expectedOptionIndex);
        expect(screen.getByText('No filtrar por usuario')).toBeInTheDocument();
        expect(screen.getByText(/User 1/)).toBeInTheDocument();
        expect(screen.getByText(/User 2/)).toBeInTheDocument();
    });
});
