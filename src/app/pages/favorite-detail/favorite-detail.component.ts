import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderService} from '../../service/header.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BaseComponent} from '../../components/base/base.component';
import { FavoriteTeamService } from 'src/app/service/favorite-team.service';
import { FavoriteTeams } from 'src/app/dataaccess/favoriteTeam';
import { Teams } from 'src/app/dataaccess/teams';
import { TeamsService } from 'src/app/service/teams.service';

@Component({
  selector: 'app-favorite-detail',
  templateUrl: './favorite-detail.component.html',
  styleUrls: ['./favorite-detail.component.scss']
})
export class FavoriteDetailComponent extends BaseComponent implements OnInit {

  favoriteTeam = new FavoriteTeams();
  teams: Teams [] = [];

  public objForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    firstname: new UntypedFormControl(''),
    teamId: new UntypedFormControl(''),
  });


  constructor(private router: Router, private headerService: HeaderService, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
              private favoriteTeamsService: FavoriteTeamService, private teamsService: TeamsService) {
    super();
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
      this.favoriteTeamsService.getOne(id).subscribe(obj => {
        this.favoriteTeam = obj;
        this.headerService.setPage('Edit Training');
        this.objForm = this.formBuilder.group(obj);
        this.objForm.addControl('categoryId', new UntypedFormControl(obj.team.id));
      });
    } else {
      this.headerService.setPage('Add new Training');
    }
    this.teamsService.getList().subscribe(obj => {
      this.teams = obj;
    });

  }

  async back() {
    await this.router.navigate(['favorite-list']);
  }

  async save(formData: any) {
    this.favoriteTeam = Object.assign(formData);

    if (this.favoriteTeam.id) {
      this.favoriteTeamsService.update(this.favoriteTeam).subscribe({
        next: () => {
          this.snackBar.open(this.messageSaved, this.messageClose, {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open(this.messageError, this.messageClose, {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.favoriteTeamsService.save(this.favoriteTeam).subscribe({
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
