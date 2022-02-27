import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { Trip } from '../models/trip';
import { User } from '../models/user';





@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(
    private http: Http,
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService 
      
    
    ) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  public addTrip(formData: Trip): Promise<Trip> { 
    console.log('Inside TripDataService#addTrip');
    return this.http
    .post(this.tripUrl, formData) //pass form data in request body
    .toPromise()
    .then(Response => Response.json() as Trip[])
    .catch(this.handleError);
  }

  public getTrips(): Promise<Trip[]>{
    console.log('Inside TripDataService#getTrips');
    return this.http
    .get(`${this.tripUrl}trips`)
    .toPromise()
    .then(response => response.json() as Trip[])
    .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip>{
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);
    return this.http
    .put(this.tripUrl + formData.code, formData)
    .toPromise()
    .then(response => response.json() as Trip[] )
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('Something has gone wrong', error); //for demo purposes only
    return Promise.reject(error.message || error);
  }
  public getToken(): string {
    return this.storage.getItem('travlr-token');
   }
   public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
   }

  public login(user: User): Promise<any> {
    return this.tripDataService.login(user)
    .then((authResp: AuthResponse) => 
   this.saveToken(authResp.token));
   }

   public register(user: User): Promise<any> {
    return this.tripDataService.register(user)
    .then((authResp: AuthResponse) => 
   this.saveToken(authResp.token));
   }

   private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse>{
     const url: string = `${this.apiBaseUrl}/${urlPath}`;
     return this.http
      .post(url, user)
      .toPromise()
      .then(response => response.json() as AuthResponse)
      .catch(this.handleError);
   }


}
