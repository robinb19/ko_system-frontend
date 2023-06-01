import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Tournament } from 'src/app/dataaccess/tournament';
import { HeaderService } from 'src/app/service/header.service';
import { TournamentService } from 'src/app/service/tournament.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent extends BaseComponent implements OnInit, AfterViewInit{
  tournamentDataSource = new MatTableDataSource<Tournament>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['tournamentName', 'tournamentLocation', 'toDate', 'actions'];

  public constructor(private tournamentService: TournamentService, private dialog: MatDialog,
                     private router: Router, private snackBar: MatSnackBar, private headerService: HeaderService){
                      super();
                      this.headerService.setPage('tournament');
                     }

  async ngOnInit() {
    await this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.tournamentDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.tournamentService.getList().subscribe(obj => {
      this.tournamentDataSource.data = obj;
    });
  }

  async edit(e: Tournament) {
    await this.router.navigate(['tournament-detail', e.id]);
  }

  async add() {
    await this.router.navigate(['tournament-detail']);
  }

  delete(e: Tournament) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Are you sure?',
        message: 'Do you really want to delete this entry?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.tournamentService.delete(e.id).subscribe({
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
