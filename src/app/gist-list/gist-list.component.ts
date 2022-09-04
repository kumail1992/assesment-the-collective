import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GistListService } from './gist-list.service';
import { ForkedUsersModalComponent } from '../components/forked-users-modal/forked-users-modal.component';

@Component({
  selector: 'app-gist-list',
  templateUrl: './gist-list.component.html',
  styleUrls: ['./gist-list.component.css'],
})
export class GistListComponent implements OnInit {
  @ViewChild('input', { static: true }) searchInput!: ElementRef;
  isLoading = false;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['user_name', 'type', 'forked_user'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  typeTags: any[] = [];

  constructor(private gistService: GistListService, public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getPublicGistsList();
  }

  getPublicGistsList() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter((res) => res.trim().length > 0),
        debounceTime(1500),
        distinctUntilChanged()
      )
      .subscribe((user_name: string) => {
        this.isLoading = true;
        let name = user_name.trim();
        this.gistService.getPublicGist(name).subscribe({
          next: (res: any) => {
            this.dataSource.data = res;
            this.isLoading = false;
          },
          error: (e) => {
            console.log(e);
            this.dataSource.data = [];
            this.isLoading = false;
          },
          complete: () => console.info('Response fetched successfully!'),
        });
      });
  }

  extractTypeTags(el: any) {
    this.typeTags = Object.keys(el).map((item) => {
      let type = el[item].type.split('/')[1];
      return type;
    });
    return [...new Set(this.typeTags)];
  }

  viewForkedUser(id: any) {
    this.dialog.open(ForkedUsersModalComponent, {
      width: '400px',
      data: {
        gist_id: id,
      },
    });
  }
}
