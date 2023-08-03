import axios from 'axios';

const baseURL = 'http://localhost:8080';

export const getColorData = async () => {
    try {
        const response = await axios.get(`${baseURL}/colorcode`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const calculateResistance = async (bandAColorId, bandBColorId, bandCColorId, bandDColorId) => {
    try {
        const response = await axios.get(`${baseURL}/colorcode/calculateResistance`, {
            params: {
                bandAColorId,
                bandBColorId,
                bandCColorId,
                bandDColorId,
            }
        });
        return response.data;
    } catch (err) {
        console.error(err);
    }
};
