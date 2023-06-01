import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import {MatTableDataSource} from '@angular/material/table';
import {HeaderService} from '../../service/header.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import { TeamsService } from 'src/app/service/teams.service';
import { Teams } from 'src/app/dataaccess/teams';


@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent extends BaseComponent implements OnInit, AfterViewInit{
  teamsDataSource = new MatTableDataSource<Teams>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['teamName', 'actions'];

  public constructor(private teamsService: TeamsService, private dialog: MatDialog,
                     private router: Router, private snackBar: MatSnackBar, private headerService: HeaderService){
                      super();
                      this.headerService.setPage('teams');
                     }

  async ngOnInit() {
    await this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.teamsDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.teamsService.getList().subscribe(obj => {
      this.teamsDataSource.data = obj;
    });
  }

  async edit(e: Teams) {
    await this.router.navigate(['teams-detail', e.id]);
  }

  async add() {
    await this.router.navigate(['teams-detail']);
  }

  delete(e: Teams) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'dialogs.title_delete',
        message: 'dialogs.message_delete'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.teamsService.delete(e.id).subscribe({
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
