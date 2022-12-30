import { createOk, IdUsuario } from '../../model';
import { getValidatedUser } from '../../renderer/components/forms/UserForm/validate';
import {
    MISSING_USER_NAME,
    MISSING_USER_SURNAME,
    USER_ALREADY_EXISTS,
} from '../../renderer/components/forms/UserForm/errorMessages';
import { cleanString } from '../../renderer/components/forms/UserForm/utils';
import { strict as assert } from 'node:assert';

describe('getValidatedUser', () => {
    const existingUsers = [
        { nombre: 'John', apellidos: 'Doe', id: '1' as IdUsuario },
        { nombre: 'Jane', apellidos: 'Doe', id: '2' as IdUsuario },
    ];

    it('should return an error when name is missing', () => {
        const usuario = { nombre: '', apellidos: 'Doe', id: '3' as IdUsuario };
        const result = getValidatedUser(usuario, existingUsers);
        expect(result.ok).toBe(false);
        assert(!result.ok);
        expect(result.error?.readableMsg).toEqual(MISSING_USER_NAME);
    });

    it('should return an error when surname is missing', () => {
        const usuario = { nombre: 'Jim', apellidos: '', id: '3' as IdUsuario };
        const result = getValidatedUser(usuario, existingUsers);
        expect(result.ok).toBe(false);
        assert(!result.ok);
        expect(result.error?.readableMsg).toEqual(MISSING_USER_SURNAME);
    });

    it('should return an error when user already exists', () => {
        const usuario = {
            nombre: 'John',
            apellidos: 'Doe',
            id: '3' as IdUsuario,
        };
        const result = getValidatedUser(usuario, existingUsers);
        expect(result.ok).toBe(false);
        assert(!result.ok);
        expect(result.error?.readableMsg).toEqual(USER_ALREADY_EXISTS);
    });
    it('should return an error when user with same name or surname but different case already exists', () => {
        const usuario = {
            nombre: 'john',
            apellidos: 'Doe',
            id: '3' as IdUsuario,
        };
        const result = getValidatedUser(usuario, existingUsers);
        expect(result.ok).toBe(false);
        assert(!result.ok);
        expect(result.error?.readableMsg).toEqual(USER_ALREADY_EXISTS);
    });

    it('should return a validated user when user is new and all fields are valid', () => {
        const usuario = {
            nombre: 'Tom',
            apellidos: 'Smith',
            id: '3' as IdUsuario,
        };
        const result = getValidatedUser(usuario, existingUsers);
        const expected = {
            nombre: cleanString(usuario.nombre),
            apellidos: cleanString(usuario.apellidos),
            id: usuario.id,
        };
        expect(result).toEqual(createOk(expected));
    });
});
