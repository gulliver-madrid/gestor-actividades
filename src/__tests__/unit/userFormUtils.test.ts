import { nameAndSurnameAlreadyExist } from '../../renderer/components/forms/UserForm/utils';
import { Usuario } from '../../model/usuario';

describe('nameAndSurnameAlreadyExist', () => {
    const user1: Usuario = { nombre: 'John', apellidos: 'Doe' };
    const user2: Usuario = { nombre: 'Jane', apellidos: 'Smith' };
    const user3: Usuario = { nombre: 'William', apellidos: 'Johnson' };
    const users: Usuario[] = [user1, user2, user3];

    test('should return true when name and surname already exist', () => {
        const newUser: Usuario = { nombre: 'john', apellidos: 'doe' };
        expect(nameAndSurnameAlreadyExist(users, newUser)).toBe(true);
    });

    test('should return false when name and surname do not exist', () => {
        const newUser: Usuario = { nombre: 'Michael', apellidos: 'Brown' };
        expect(nameAndSurnameAlreadyExist(users, newUser)).toBe(false);
    });

    test('should return true when name and surname have extra spaces', () => {
        const newUser: Usuario = { nombre: '  John  ', apellidos: '  Doe  ' };
        expect(nameAndSurnameAlreadyExist(users, newUser)).toBe(true);
    });

    test('should return true when name and surname have mixed case', () => {
        const newUser: Usuario = { nombre: 'JoHn', apellidos: 'DOE' };
        expect(nameAndSurnameAlreadyExist(users, newUser)).toBe(true);
    });

    test('should handle empty user list', () => {
        const newUser: Usuario = { nombre: 'John', apellidos: 'Doe' };
        expect(nameAndSurnameAlreadyExist([], newUser)).toBe(false);
    });

    test('should handle empty name and surname', () => {
        const newUser: Usuario = { nombre: '', apellidos: '' };
        expect(nameAndSurnameAlreadyExist(users, newUser)).toBe(false);
    });

    test('should handle null surname', () => {
        const newUser: Usuario = { nombre: 'Joe', apellidos: null };
        expect(nameAndSurnameAlreadyExist(users, newUser)).toBe(false);
    });
});
