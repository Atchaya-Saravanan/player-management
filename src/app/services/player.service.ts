import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  baseUrl = 'https://my-json-server.typicode.com/Atchaya-Saravanan/mockjson/people';

  constructor(private http: HttpClient) { }

  getAllPlayers() {
    return this.http.get<Player[]>(this.baseUrl);
  }

  getPlayerById(playerId: number) {
    return this.http.get<Player>(this.baseUrl + '/' + playerId);
  }

  updatePlayerDetails(player: Player) {
    return this.http.put<Player>(this.baseUrl + '/' + player.id, player);
  }

  postPlayerDetails(player: Player) {
    return this.http.post<Player>(this.baseUrl, player);
  }

  deletePlayer(playerId: string) {
    return this.http.delete(this.baseUrl + '/' + playerId);
  }
}
