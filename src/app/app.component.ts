import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  constructor(private pokemonService:PokemonService){}
  listaPokemon:BehaviorSubject<any> = new BehaviorSubject({
    oficial:[],
    local:[]
  });

  last = "";

  pokemonSubscription: Subscription;
  pokemonLocalSubscription: Subscription;

  ngOnInit(){
    this.requestListas();
  }

  requestListas(){
    this.pokemonSubscription = this.pokemonService.getPokemonDatabaseOficial().subscribe(
      (response:any) => {
        console.log(response);
        let lista = {...this.listaPokemon.value};
        lista.oficial = response.results || [];
        this.listaPokemon.next(lista);
      },
      error => console.log(error),
      () => console.log("complete!")
    )
    this.pokemonLocalSubscription = this.pokemonService.getPokemonDatabaseLocal().subscribe(
      (response:any) => {
        console.log(response);
        let lista = {...this.listaPokemon.value};
        lista.local = response || [];
        this.listaPokemon.next(lista);
        this.last = "";
      },
      error => console.log(error),
      () => console.log("complete!")
    )
  }

  adicionarLocal(nome){
    if(this.last == nome) return;
    if(this.listaPokemon.value.local.find(x => x.name == nome) ? true : false) return;

    this.last = nome;
    this.pokemonService.postNewPokemonDatabaseLocal(nome).subscribe(x => {
      this.requestListas();
    });
  }

  removerLocal(id){
    if(this.last == id) return;
    this.last = id;
    this.pokemonService.deletePokemonDatabaseLocal(id).subscribe(x => {
      this.requestListas();
    });
  }


  ngOnDestroy(){
    if(this.pokemonSubscription){
      this.pokemonSubscription.unsubscribe();
    }
    if(this.pokemonLocalSubscription){
      this.pokemonLocalSubscription.unsubscribe();
    }
  }

}
