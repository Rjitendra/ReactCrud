import { fetchWrapper } from '../helper/fetch-wrapper';

const baseUrl = 'https://localhost:44372/api/Employee';

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
   return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
   return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
