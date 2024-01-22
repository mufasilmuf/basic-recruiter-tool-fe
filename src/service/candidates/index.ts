import { api } from "../api";

const getAllCandidates = async (path: string, onSuccess: any, onError: any) => {
    return await api.get(path, onSuccess, onError);
}

const getCandidateById = async (path: string, onSuccess: any, onError: any) => {
    return await api.get(path, onSuccess, onError);
}

const addNewCandidates = async (path: string, data: any, onSuccess: any, onError: any) => {
    return await api.post(path, data, onSuccess, onError);
}

const updateCandidates = async (path: string, data: any, onSuccess: any, onError: any) => {
    return await api.patch(path, data, onSuccess, onError);
}

const deleteCandidate = async (path: string, onSuccess: any, onError: any) => {
    return await api.delete(path, onSuccess, onError);
}


export { getAllCandidates, getCandidateById, addNewCandidates, updateCandidates, deleteCandidate }