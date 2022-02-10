import AdModel from "./model";
import * as mysql2 from "mysql2/promise";

import IErrorResponse from "../../common/IErrorResponse.interface";

class AdService {
  private db: mysql2.Connection;

  constructor(db: mysql2.Connection) {
    this.db = db;
  }

  protected async adaptModel(row: any): Promise<AdModel> {
    const item: AdModel = new AdModel();

    item.adId = +row?.ad_id;
    item.name = row?.name;
    item.user_id = +row?.user_id;
    item.description = row?.description;
    item.created_at = row?.created_at;
    item.species_id = +row?.species_id;
    item.breed = row?.breed;
    item.has_papers = row?.has_papers;
    item.age = +row?.age;
    item.is_vaccinated = row?.is_vaccinated;
    item.color_id = +row?.color_id;

    return item;
  }

  public async getAll(): Promise<AdModel[] | IErrorResponse> {
    return new Promise<AdModel[] | IErrorResponse>(async (resolve) => {
      const sql: string = "SELECT * FROM ad;";
      this.db
        .execute(sql)
        .then(async (result) => {
          const rows = result[0];
          const lista: AdModel[] = [];

          if (Array.isArray(rows)) {
            for (const row of rows) {
              lista.push(await this.adaptModel(row));
            }
          }
          resolve(lista);
        })
        .catch((error) => {
          resolve({
            errorCode: error?.errno,
            errorMessage: error?.sqlMessage,
          });
        });
    });
  }

  public async getById(adId: number): Promise<AdModel | null | IErrorResponse> {
    return new Promise<AdModel | null | IErrorResponse>(async (resolve) => {
      const sql: string = "SELECT * FROM ad WHERE ad_id = ?;";
       this.db.execute(sql, [adId])
       .then(async result => {
        const [rows, colums] = result;
        if (!Array.isArray(rows)) {
            resolve(null);
            return;
          }
    
          if (rows.length === 0) {
            resolve(null);
            return;
          }
    
          resolve(await this.adaptModel(rows[0]));
       })
       .catch(error => {
        resolve({
            errorCode: error?.errno,
            errorMessage: error?.sqlMessage,
          });
       });

      
    });
  }
}

export default AdService;
