import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  @Input() player: Player;
  @Output() deletePlayer: EventEmitter<number> = new EventEmitter<number>();
  @Output() editPlayer: EventEmitter<number> = new EventEmitter<number>();

  constructor() { 
    this.player = {
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      email: '',
      education: '',
      sportName: '',
      level: ''
    }
  }

  onDeletePlayerClicked(): void {
    this.deletePlayer.emit(this.player.id);
  }

  onEditPlayerClicked(): void {
    this.editPlayer.emit(this.player.id);
  }

}
