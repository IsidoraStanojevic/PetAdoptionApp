import AdModel from "./model";
declare class AdService {
    getAll(): Promise<AdModel[]>;
}
export default AdService;
