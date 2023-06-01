import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Tournament } from 'src/app/dataaccess/tournament';
import { HeaderService } from 'src/app/service/header.service';
import { TournamentService } from 'src/app/service/tournament.service';
import {BaseComponent} from '../../components/base/base.component';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss']
})
export class TournamentDetailComponent extends BaseComponent implements OnInit {

  tournament = new Tournament();
  public objForm = new UntypedFormGroup({
    tournamentName: new UntypedFormControl(''),
    tournamentLocation: new UntypedFormControl(''),
    toDate: new UntypedFormControl(''),
  });

  constructor(private router: Router, private headerService: HeaderService, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
              private tournamentService: TournamentService) {
                super();
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.tournamentService.getOne(id).subscribe(obj => {
        this.tournament = obj;
        this.headerService.setPage('tournament_edit');
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.headerService.setPage('tournament_new');
      this.objForm = this.formBuilder.group(this.tournament);
    }
  }

  async back() {
    await this.router.navigate(['tournament-list']);
  }

  async save(formData: any) {
    this.tournament = Object.assign(formData);

    if (this.tournament.id) {
      this.tournamentService.update(this.tournament).subscribe({
        next: () => {
          this.snackBar.open(this.messageSaved, this.messageClose, {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open(this.messageError, this.messageClose, {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.tournamentService.save(this.tournament).subscribe({
        next: () => {
          this.snackBar.open(this.messageNewSaved, this.messageClose, {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open(this.messageNewError, this.messageClose, {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }

}
