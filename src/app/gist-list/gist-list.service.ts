import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GistListService {
  constructor(private httpClient: HttpClient) {}
  getPublicGist(user_name: any) {
    return this.httpClient.get(
      `https://api.github.com/users/${user_name}/gists`
    );
  }

  getForkedUsersList(gist_id: any) {
    return this.httpClient.get(`https://api.github.com/gists/${gist_id}/forks`);
  }
}
