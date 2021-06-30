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
}

export default AdService;