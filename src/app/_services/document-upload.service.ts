/**
 * @whatItDoes Provides a service for uploading documents during decision supports.
 *
 * @description
 *  This service handles the uploading of files, creating decision support documents, and retrieving document lists associated with decision supports.
 */

import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DocumentUploadService {
  private uploadUrl = environment.fileUploadURL;
  private createEntityUrl = environment.postDecisionSupportDocumentsURL;
  filename!:string;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  uploadFile(file: File): Observable<any> {
    const headers = this.authService.getPOSTFileUploadHeaders()
      .set('Content-Type', 'application/octet-stream')
      .set('Content-Disposition', `file; filename="${file.name}"`);

    // Prepare the file data as binary
    const fileData = file;
    this.filename = file.name;
    return this.http.post(this.uploadUrl, fileData, {
      headers,
      responseType: 'json'
    });
  }

  createDecisionSupportDocument(fid: string, label: string, notes: string, stepId: string, decisionSupportId: string): Observable<any> {
    const headers = this.authService.getPOSTFileUploadHeaders()
      .set('Content-Type', 'application/json');

    const postData = {
      label: this.filename,
      notes,
      stepId,
      decisionSupportId,
      fid,
      visible: true
    };

    return this.http.post(this.createEntityUrl, postData, {headers});
  }

  archiveDecisionSupportDocument(fileId: string){
    const headers =this.authService.getHeaders();
    return this.http.patch<any[]>(`${environment.archiveDecisionSupportDocumentsURL}${fileId}`, {headers});
  }

  getDocumentlist(decisionSupportId:string){
    const headers =this.authService.getHeaders();
    return this.http.get<any[]>(`${environment.getDecisionSupportDocumentsURL}${decisionSupportId}`, {headers});
  }
}