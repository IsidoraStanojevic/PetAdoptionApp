import AdModel from "./model";
import * as mysql2 from "mysql2/promise";

class AdService {
  private db: mysql2.Connection;

  constructor(db: mysql2.Connection) {
    this.db = db;
  }

  protected async adaptModel(row: any): Promise<AdModel>{
    const item: AdModel = new AdModel();

    item.adId=+(row?.ad_id);
    item.name=row?.name;
    item.user_id=+(row?.user_id);
    item.description=row?.description;
    item.created_at=row?.created_at;
    item.species_id=+(row?.species_id);
    item.breed=row?.breed;
    item.has_papers=row?.has_papers;
    item.age=+(row?.age);
    item.is_vaccinated=row?.is_vaccinated;
    item.color_id=+(row?.color_id);
    
    return item;
  }

  public async getAll(): Promise<AdModel[]> {
    const lista: AdModel[] = [];

    const sql: string = "SELECT * FROM ad;";
    const [rows, colums] = await this.db.execute(sql);

    if(Array.isArray(rows)){
        for (const row of rows){
            lista.push(await this.adaptModel(row))
        }
    }

    return lista;
  }

  public async getById(adId: number): Promise<AdModel | null> {
    const sql: string = "SELECT * FROM ad WHERE ad_id = ?;";
    const [rows, colums] = await this.db.execute(sql, [adId]);
      
    if (!Array.isArray(rows)){
        return null;
    }

    if(rows.length===0){
        return null;
    }

    return await this.adaptModel(rows[0]);
  }
}

export default AdService;
