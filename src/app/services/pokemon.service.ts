import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http:HttpClient) { }

  getPokemonDatabaseOficial(){
    return this.http.get("https://pokeapi.co/api/v2/pokemon");
  }

  getPokemonDatabaseLocal(){
    return this.http.get("http://localhost:3000/pokemon");
  }

  postNewPokemonDatabaseLocal(pokemon){
    return this.http.post("http://localhost:3000/pokemon",{"name":pokemon});
  }

  deletePokemonDatabaseLocal(id){
    return this.http.delete(`http://localhost:3000/pokemon/${id}`);
  }

}
