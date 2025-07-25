import axios from "axios";
import type { Note } from "../types/note";

// FetchNotesResponse


// GET https://notehub-public.goit.study/api/notes?page=1&perPage=12
// GET https://notehub-public.goit.study/api/notes?search=mysearchtext


export interface NoteListParams  {
    page: number;
    perPage: number;
    search?: string;
}
export interface NoteListResponse {
    notes: Array<Note>;
    totalPages: number;
}

const API_URL = 'https://notehub-public.goit.study/api/notes';

const perPage = 5;

export const fetchNotes = async (search: string, page: number): Promise<NoteListResponse> => {
    let params: NoteListParams = {
        page,
        perPage
    };

    if (search) {
        params = {
            ...params,
            search
        };
    }

    try {
        const response = await axios.get<NoteListResponse>(API_URL, {
            params,
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
                accept: 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data from TMDb:', error);
        throw error;
    }
};

// createNote

// deleteNote