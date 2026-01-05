import axios from 'axios';

var api_call = axios.create({
    baseURL: process.env.API_BASE_URL,
    // timeout: 10000,
});

export const addNotification = ({ commit }, notification) => {
    commit('PUSH_NOTIFICATION', notification);
}


export const MessageBox = ({ commit }, { header, body }) => {
    commit('MessageBox', { header, body });
}



export const setLandingPage = ({ commit }, landingPageNumber) => {
    commit('SETLANDINGPAGE', landingPageNumber);
}