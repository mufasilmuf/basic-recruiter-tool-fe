
import { api } from "../api";

const getAllSkills = async (path: string, onSuccess: any, onError: any) => {
    return await api.get(path, onSuccess, onError);
}

const addCandidateSkills = async (path: string, data: any, onSuccess: any, onError: any) => {
    return await api.post(path, data, onSuccess, onError);
}

const getCandidateSkills = async (path: string, onSuccess: any, onError: any) => {
    return await api.get(path, onSuccess, onError);
}

export { getAllSkills, addCandidateSkills, getCandidateSkills }