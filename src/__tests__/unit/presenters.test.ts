import { ProjectName, Status } from '../../model';
import { crearMsgFiltros } from '../../renderer/presenters/filterMsgCreator';
import { createemptyFilters } from '../../renderer/transformers/activity';

describe('crearMsgFiltros', () => {
    it('no filters', () => {
        const emptyFilters = createemptyFilters();
        expect(crearMsgFiltros(emptyFilters)).toBe('No hay filtros activos');
    });
    it('filtering by single project', () => {
        const filters = createemptyFilters();
        const projectFilter = 'Project number 1' as ProjectName;
        filters.projects.push(projectFilter);
        expect(crearMsgFiltros(filters)).toBe(
            `Filtrando por proyecto "Project number 1"`
        );
    });
    it('filtering by single status', () => {
        const filters = createemptyFilters();
        const statusFilter: Status = 'Activa';
        filters.status.push(statusFilter);
        expect(crearMsgFiltros(filters)).toBe(`Filtrando por status Activa`);
    });
});
