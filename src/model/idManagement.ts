import { v4 as uuidv4 } from 'uuid';
import { asIdActividad, IdImagen, IdUsuario } from '.';

const createNewIdImagen = () => {
    const uuidId = uuidv4();
    const miniId = uuidId.substring(0, 8);
    return (createDateString(new Date()) + '__' + miniId) as IdImagen;
};

const createDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Los meses van de 0 a 11, por lo que se le suma 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const monthNumber = toTwoDigits(month);
    const dayNumber = toTwoDigits(day);
    const hourNumber = toTwoDigits(hours);
    const minuteNumber = toTwoDigits(minutes);
    const secondNumber = toTwoDigits(seconds);
    return `${year}-${monthNumber}-${dayNumber}__${hourNumber}-${minuteNumber}-${secondNumber}`;
};

// Crea una representacion del numero agregando un cero a la izquierda si tiene un solo dígito
const toTwoDigits = (n: number): string => n.toString().padStart(2, '0');

const createNewIdUsuario = () => uuidv4() as IdUsuario;
const createNewIdActividad = () => asIdActividad(uuidv4());

export { createNewIdImagen, createNewIdUsuario, createNewIdActividad };
