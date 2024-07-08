import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
apiUrl="http://localhost:8080/api/v1/statrecapchaine"
  constructor(private http:HttpClient) {

   }

   
   getAll(){
    return this.http.get(this.apiUrl)
   }
   getPerformanceParFamille():Observable<any>{
    return this.http.get<any>(this.apiUrl+'/getPerformanceParFamille')
   }
   

   getKpi() {
    return this.http.get(this.apiUrl + '/kpi');
}

calculateSumRendementByEmployer(){
  return this.http.get(this.apiUrl+'/calculateSumRendementByEmployer')
}



getSumRendementChaineByChaine(){
     return this.http.get(`${this.apiUrl}/sum-quantity-by-chaine-montage`); }

   
     
    calculateSumTempsTravailParEmploye(){
      return this.http.get(`${this.apiUrl}/calculateSumTempsTravailParEmploye`);
    }


    getMonthlyRendement(){
      return this.http.get(`${this.apiUrl}/getMonthlyRendement`);
    }




    getYearlyRendement(){
      return this.http.get(`${this.apiUrl}/getYearlyRendement`);
    }



    getDailyRendement(){
      return this.http.get(`${this.apiUrl}/getDailyRendement`);
    }





    getAvgRendement(){
      return this.http.get(`${this.apiUrl}/avgrendement`);
    }

    getTotalProduction(){
      return this.http.get(`${this.apiUrl}/getTotalProduction`);
    }

    getTotalEmployee(){
      return this.http.get(`${this.apiUrl}/getTotalEmployee`);
    }

    create( stat: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/create`, stat);
    }

    update(id: number, stat: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/${id}`, stat);
    }

    delete(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}
