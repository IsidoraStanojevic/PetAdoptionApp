import AdModel from "./model";
 
class AdService{

    public async getAll(): Promise <AdModel[]>{
        const lista: AdModel[]=[];

        lista.push({

            adId:1,
            name:"Lav",
            userId: null,    
        });

        lista.push({

            adId:2,
            name:"Leposava",
            userId: 1,    
        });


        return lista;
    }

    public async getById(adId: number): Promise<AdModel | null >{
        if(adId===1 || adId===2){
            if (adId === 1){
                return{
                    adId:1,
                    name:"Lav",
                    userId: null,   
                }
            }
            if (adId === 2){
                return{
                    adId:2,
                    name:"Leposava",
                    userId: 1,   
                }
            }

        }else {
            return null; 
        }

    }
}

export default AdService;