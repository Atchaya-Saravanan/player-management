import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Player } from './models/player.model';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'player-management';

  educationList = [
    'Diploma',
    'Graduate',
    'Post Graduate',
    'PhD'
  ];

  sportsList = [
    'Table Tennis',
    'Chess',
    'Volleyball',
    'Baseball',
    'Gymnastics',
    'Athletics',
    'Football',
    'Basketball',
    'Cricket'
  ];

  levelList = [
    'International',
    'National',
    'State',
    'District',
    'University level'
  ];

  @ViewChild('addPlayerButton') addPlayerButton: any;
  public isPlayerUpdated: boolean = false;
  public playerForm: FormGroup;
  public playerList: Player[] = [];
  public playerListToDisplay: Player[] = [];

  constructor(private fb: FormBuilder, private playerService: PlayerService) {
    this.playerForm = fb.group({});
    this.playerList = [];
    this.playerListToDisplay = this.playerList;
  }

  public ngOnInit(): void {
    this.playerForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]*$")]),
      lastName: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z].*$")]),
      birthDate: this.fb.control('', Validators.required),
      gender: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      education: this.fb.control(this.educationList[0], Validators.required),
      sportName: this.fb.control(this.sportsList[0], Validators.required),
      level: this.fb.control(this.levelList[0], Validators.required)
    });
    this.getAllPlayersData();
  }

  public getAllPlayersData(): void {
    this.playerService.getAllPlayers().subscribe((response) => {
      for (let player of response) {
        this.playerList.unshift(player);
      }
      this.playerListToDisplay = this.playerList;
    });
  }

  public clearForm(): void {
    this.playerForm.reset();
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.BirthDate.setValue('');
    this.Gender.setValue('');
    this.Email.setValue('');
    this.Education.setValue(this.educationList[0]);
    this.SportName.setValue(this.sportsList[0]);
    this.Level.setValue(this.levelList[0]);
  }

  public setForm(player: Player): void {
    this.FirstName.setValue(player.firstName);
    this.LastName.setValue(player.lastName);
    this.BirthDate.setValue(player.birthDate);
    this.Gender.setValue(player.gender);
    this.Email.setValue(player.email);
    this.Education.setValue(player.education);
    this.SportName.setValue(player.sportName);
    this.Level.setValue(player.level);
  }

  public addPlayer() {
    let player: Player = {
      firstName: this.FirstName.value,
      lastName: this.LastName.value,
      birthDate: this.BirthDate.value,
      gender: this.Gender.value,
      email: this.Email.value,
      education: this.Education.value,
      sportName: this.SportName.value,
      level: this.Level.value
    }

    this.playerService.postPlayerDetails(player).subscribe(response => {
      this.playerList.unshift(response);
      this.clearForm();
    });
  }

  public editPlayer(playerId: number): void {
    let player: Player;
    this.playerService.getPlayerById(playerId).subscribe((response) => {
      player = response;
      if (player) {
        this.isPlayerUpdated = true;
        this.setForm(player);
        this.deletePlayer(playerId);
        this.addPlayerButton.nativeElement.click();
      }
    });
  }

  public deletePlayer(playerId: any): void {
    this.playerList.forEach((player, index) => {
      if (player.id === parseInt(playerId)) {
        this.playerService.deletePlayer(playerId).subscribe((response) => {
          this.playerList.splice(index, 1);
        });
      }
    });
  }

  public searchPlayers(event: any): void {
    let filteredPlayers: Player[] = [];
    if (event === '') {
      this.playerListToDisplay = this.playerList
    } else {
      filteredPlayers = this.playerList.filter((player) => {
        let targetKey = player.firstName.toLowerCase() + '' + player.lastName.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.playerListToDisplay = filteredPlayers;
    }
  }

  public get FirstName(): FormControl {
    return this.playerForm.get('firstName') as FormControl;
  }
  public get LastName(): FormControl {
    return this.playerForm.get('lastName') as FormControl;
  }
  public get BirthDate(): FormControl {
    return this.playerForm.get('birthDate') as FormControl;
  }
  public get Gender(): FormControl {
    return this.playerForm.get('gender') as FormControl;
  }
  public get Email(): FormControl {
    return this.playerForm.get('email') as FormControl;
  }
  public get Education(): FormControl {
    return this.playerForm.get('education') as FormControl;
  }
  public get SportName(): FormControl {
    return this.playerForm.get('sportName') as FormControl;
  }
  public get Level(): FormControl {
    return this.playerForm.get('level') as FormControl;
  }
}
