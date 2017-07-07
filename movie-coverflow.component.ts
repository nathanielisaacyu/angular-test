import { Component, HostListener } from '@angular/core';
import { Movie } from './movie';

const coverflowItems = [
      { title: "One", image: "https://dcassetcdn.com/design_img/726305/215313/215313_4489637_726305_thumbnail.jpg" },
      { title: "Two", image: "http://static.tvtropes.org/pmwiki/pub/images/Brave-Apple-Poster_1143.jpg" },
      { title: "Three", image: "http://www.revelationz.net/images/movies/avengers-movie-poster-1small.jpg" },
      { title: "Four", image: "https://s-media-cache-ak0.pinimg.com/736x/78/72/66/78726686611e3c9b6cbe3f1ede601fcf--star-wars-vii-star-trek.jpg" },
      { title: "Five", image: "https://s-media-cache-ak0.pinimg.com/736x/2c/de/0a/2cde0a435f4345c31040d464262c8fe6--original-movie-posters-film-posters.jpg" },
      { title: "Six", image: "https://cdn.shopify.com/s/files/1/1083/5290/products/Gladiator_2000_Movie_Poster_27x40_large.jpg?v=1451264932" },
      { title: "Seven", image: "http://t05.deviantart.net/OeoiUPqVO7_WbPfbGqm7-ON2fYE=/fit-in/300x900/filters:no_upscale():origin()/pre03/5002/th/pre/i/2009/237/3/1/bioshock_movie_poster_by_scorpionsoldier.jpg" }
    ];

@Component({
  selector: 'movie-coverflow',
  template: 
  `<div class="coverflow__master-container vignette"> 
      <div class="coverflow">
            <div class="coverflow__container">
                <div class="coverflow__element" *ngFor="let item of list; let i = index" [ngStyle]="loadElementStyle(i)" (click)="changeIndex(i)">
                    <div class="coverflow__image">
                        <img width="300" height="444" src="{{ item.image }}" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <movie-detail [movie]="selectedMovie"></movie-detail>`,
    styles: [`
        .vignette {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          box-shadow: 0 0 200px rgba(0,0,0,0.9) inset;
        }

        .coverflow__master-container {
            position: relative;
            height: 600px;
            width: 100%;
            border: 1px solid gray;
            background: #222222;
        }

        .coverflow__container {
            position: absolute;
            left: 0;
            right: 0;
            perspective: 900px;
            top: 200px;
            transform: translateY(-50%);
        }

        .coverflow__element {
            position: absolute;
            left: 50%;
            width: 300px;
            height: 444px;
            margin-left: -280px;
            margin-top: -175px;
            transform-style: preserve-3d;
            transition: all 400ms cubic-bezier(0.01, 0.75, 0.34, 0.95);
            background: #fff;
            cursor: pointer;
        }

        .coverflow__image img {
            width: 100%;
            -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(70%, transparent) , to(rgba(250, 250, 250, 0.3)));
        }
    `]
})

export class MovieCoverflowComponent {
    index: number;
    list: Movie[];
    selectedMovie: Movie;

    constructor() {
        this.index = parseInt(`${coverflowItems.length / 2}`);
        this.list = coverflowItems;
        this.selectedMovie = this.resolveMovie(this.index);
    }

    getNonFocussedElementStyle(loc: number, i: number, multiplier: number) {
        let translateX = (loc * 40 - 12 * multiplier);
        let rotateY = (loc * -50);
        let zIndex = (loc * multiplier);

        return {
            'transform': `translateX(${translateX}%) rotateY(${rotateY}deg) scale(.6)`,
            'z-index': `${zIndex}`
        };
    }

    getFocussedElementStyle(i: number) {
        return {
            'transform': `translateZ(0)`
        };
    }

    changeIndex(i: number) {
        this.index = i;
        this.selectedMovie = this.resolveMovie(i);
    }

    resolveMovie(i: number): Movie {
        return this.list[i];
    }

    loadElementStyle(i: number) {
        var multiplier = this.index - i;
        if (i < this.index) {
            return this.getNonFocussedElementStyle(-1, i, multiplier);
        } else if (i === this.index) {
            return this.getFocussedElementStyle(i);
        } else {
            return this.getNonFocussedElementStyle(1, i, multiplier);
        }
    };

    /*@HostListener('document:keyup', ['$event'])
    listenToKeystrokes(ev: KeyboardEvent) {
        if (ev.key === 37) {
            this.goLeft();
        } else if (ev.key === 39) {
            this.goRight();
        }
    }*/

    goLeft() {
        if (this.index !== 0) {
            this.index--;
        }
    }

    goRight() {
        if (this.index !== this.list.length - 1) {
            this.index++;
        }
    }
}