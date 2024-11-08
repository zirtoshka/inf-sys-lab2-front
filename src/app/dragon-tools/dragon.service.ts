import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DragonService {
  private readonly baseUrl = 'http://localhost:8080'; //todo change
  constructor(private http: HttpClient) { }

  addDragon(){}

  getDragon(){}
}
