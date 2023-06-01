import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderService} from '../../service/header.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Teams} from '../../dataaccess/teams';
import {TeamsService} from '../../service/teams.service';
import {BaseComponent} from '../../components/base/base.component';

@Component({
  selector: 'app-teams-detail',
  templateUrl: './teams-detail.component.html',
  styleUrls: ['./teams-detail.component.scss']
})
export class TeamsDetailComponent extends BaseComponent implements OnInit {

  teams = new Teams();
  public objForm = new UntypedFormGroup({
    teamName: new UntypedFormControl(''),
  });

  constructor(private router: Router, private headerService: HeaderService, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
              private teamsService: TeamsService) {
    super();
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.teamsService.getOne(id).subscribe(obj => {
        this.teams = obj;
        this.headerService.setPage('teams_edit');
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.headerService.setPage('teams_new');
      this.objForm = this.formBuilder.group(this.teams);
    }
  }

  async back() {
    await this.router.navigate(['teams-list']);
  }

  async save(formData: any) {
    this.teams = Object.assign(formData);

    if (this.teams.id) {
      this.teamsService.update(this.teams).subscribe({
        next: () => {
          this.snackBar.open(this.messageSaved, this.messageClose, {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open(this.messageError, this.messageClose, {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.teamsService.save(this.teams).subscribe({
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
