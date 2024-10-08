/**
 * @whatItDoes Provides services for the Process Class 
 *
 * @description
 *  GET (list), POST, DUPLICATE, PATCH and ARCHIVE are available for Process as a whole. GET, POST, PATCH and DELETE are avaialble for individual steps.
 */

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ProcessList} from '../_classes/process-list';
import {Process} from '../_classes/process';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {


  constructor(private http: HttpClient, private authService: AuthService) {}

  getProcessList(): Observable<ProcessList[]> {
    const headers = this.authService.getHeaders();
    return this.http.get<ProcessList[]>(environment.getProcessListURL, { headers });
  }

  postProcess(data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post<Process>(environment.postProcessURL, data, { headers });
  }

  duplicateProcess(data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post<Process>(environment.duplicateProcessURL, data, { headers });
  }

  patchProcess(processId:number, data:any): Observable<any>{
    const headers = this.authService.getHeaders();
    return this.http.patch<Process>(`${environment.patchProcessURL}${processId}`, data, {headers});
  }
  
  archiveProcess(processId:string): Observable<any>{
    const headers = this.authService.getHeaders();
    return this.http.patch<Process>(`${environment.archiveProcessURL}${processId}`,{headers}); 
  }

  //Step Functions: GET POST PATCH DELETE
  
  getProcessSteps(processId: string): Observable<Process> {
    const headers = this.authService.getHeaders();
    return this.http.get<Process>(`${environment.getProcessURL}${processId}?_format=json`, { headers });
  }

  updateProcessStep(processId: number, stepData: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.patch<Process>(`${environment.updateProcessURL}${processId}`, stepData, {headers});
  }


}