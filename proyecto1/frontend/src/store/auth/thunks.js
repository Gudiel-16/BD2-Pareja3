import { checkingCredentiasl } from './';

export const checkingAtuhenication = ( email, password ) => {
    return async (dispatch) => {
        dispatch( checkingCredentiasl() );
    }
};