import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NutritionApiService {

  constructor(private httpClient: HttpClient) { }

  // get nutrition details - POST 
  getNutritionDetails(body) {
    return this.httpClient.post(environment.api_url + 'nutrition-details', body);
  }

  // get nutrition data - get
  getNutritionData(body) {
    return this.httpClient.get(environment.api_url + 'nutrition-data?ingr=' + body + '&' );
  }
  
}
