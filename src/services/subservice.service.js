import { subService } from '../models';

export const List = async () => {
    return subService.find();
};
