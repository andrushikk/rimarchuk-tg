import axios from '@/axios';
import { UserMessage } from '@/utils/types';
import { AddWater, Percent, WaterGetData } from '@/utils/types/water';

export const waterGet = async (): Promise<WaterGetData> => {
    const response = await axios.get(`/api/water/getml`);
    return response.data;
};

export const addWaterRequest = async (water_ml: AddWater): Promise<UserMessage> => {
    const response = await axios.post(`/api/water/setwater?water_ml=${water_ml.water_ml}`);
    return response.data;
};

export const getWaterPercent = async (): Promise<Percent> => {
    const response = await axios.get('/api/water/procent');
    return response.data;
};

export const delWaterRequest = async ({ user_id, water_ml }: AddWater): Promise<UserMessage> => {
    const response = await axios.post(`/api/water/delml?user_id=${user_id}&water_ml=${water_ml}`);
    return response.data;
};

export const editQuota = async (newQuota: number) => {
    const response = await axios.put(`/api/water/editquota?newQuota=${newQuota}`);
    return response;
};
