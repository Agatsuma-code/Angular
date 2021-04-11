import { MessageService } from '../messages/message.service';
import { HeroService } from '../hero/hero.service';
import { Component, OnInit } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Observable, of } from 'rxjs';
import {Hero} from '../hero';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  // heroes = HEROES;
  heroes: Hero[] = [];
  // selectedHero?: Hero;

  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };
  // heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  // onSelect(hero: Hero):void{
  //   this.selectedHero=hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  // }

  // Original
  // getHeroes(): void{
  //   this.heroes = this.heroService.getHeroes();
  // }

  // Observable
  /*The new version waits for the Observable to emit the array of heroes—which could happen now or
  several minutes from now. The subscribe() method passes the emitted array to the callback,
  which sets the component's heroes property.
  This asynchronous approach will work when the HeroService requests heroes from the server.*/





  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }


  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }


  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();

  }

}
