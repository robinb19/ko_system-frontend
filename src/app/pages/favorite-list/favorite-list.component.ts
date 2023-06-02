import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import {MatTableDataSource} from '@angular/material/table';
import {HeaderService} from '../../service/header.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import { FavoriteTeamService } from 'src/app/service/favorite-team.service';
import { FavoriteTeams } from 'src/app/dataaccess/favoriteTeam';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent extends BaseComponent implements OnInit, AfterViewInit{
  favoriteTeamDataSource = new MatTableDataSource<FavoriteTeams>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['name', 'firstname', 'team', 'actions'];

  public constructor(private favoriteTeamService: FavoriteTeamService, private dialog: MatDialog,
                     private router: Router, private snackBar: MatSnackBar, private headerService: HeaderService){
                      super();
                      this.headerService.setPage('favoriteTeam');
                     }

  async ngOnInit() {
    await this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.favoriteTeamDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.favoriteTeamService.getList().subscribe(obj => {
      this.favoriteTeamDataSource.data = obj;
    });
  }

  async edit(e: FavoriteTeams) {
    await this.router.navigate(['favorite-detail', e.id]);
  }

  async add() {
    await this.router.navigate(['favorite-detail']);
  }

  delete(e: FavoriteTeams) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Are you sure?',
        message: 'Do you really want to delete this entry?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.favoriteTeamService.delete(e.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open(this.deletedMessage, this.closeMessage, {duration: 5000});
              this.reloadData();
            } else {
              this.snackBar.open(this.deleteErrorMessage, this.closeMessage, {duration: 5000});
            }
          },
          error: () => this.snackBar.open(this.deleteErrorMessage, this.closeMessage, {duration: 5000})
        });
      }
    });
  }

}
