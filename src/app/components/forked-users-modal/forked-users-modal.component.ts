import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GistListService } from 'src/app/gist-list/gist-list.service';

@Component({
  selector: 'app-forked-users-modal',
  templateUrl: './forked-users-modal.component.html',
  styleUrls: ['./forked-users-modal.component.css'],
})
export class ForkedUsersModalComponent implements OnInit {
  isLoading: boolean = false;
  forked_users: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gistService: GistListService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getForkedUsers();
  }

  getForkedUsers() {
    this.isLoading = true;
    this.gistService.getForkedUsersList(this.data.gist_id).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.forked_users = res.reverse();
      },
      error: (e) => {
        console.error(e);
        this.isLoading = false;
      },
      complete: () => console.info('Successfull!'),
    });
  }
  routeToFork(url: any) {
    window.open(url, '_blank');
  }
}
