import { Component, HostListener, KeyboardEvent } from '@angular/core';

class Movie {
    title: string;
    image: string;
}

const coverflowItems = [
      { title: "One", image: "http://placehold.it/560x290/ffccff" },
      { title: "Two", image: "http://placehold.it/560x290/66ffcc" },
      { title: "Three", image: "http://placehold.it/560x290/66ffff" },
      { title: "Four", image: "http://placehold.it/560x290/ffff99" },
      { title: "Five", image: "http://placehold.it/560x290/ffcccc" },
      { title: "Six", image: "http://placehold.it/560x290/ccffcc" },
      { title: "Seven", image: "http://placehold.it/560x290/99ddff" }
    ];

@Component({
  selector: 'hero-coverflow',
  template: 
  ` <div class="coverflow">
        <div class="coverflow__container">
            <div class="coverflow__element" *ngFor="let item of list; let i = index" [ngStyle]="loadElementStyle(i)" (click)="changeIndex(i)">
            <h2  class="coverflow__title">{{ item.title }}</h2>
                <div class="coverflow__image">
                    <img src="{{ item.image }}" />
                </div>
            </div>
        </div>
    </div>`,
    styles: [`
        .coverflow__container {
            position: absolute;
            left: 0;
            right: 0;
            perspective: 900px;
            top: 50%;
            transform: translateY(-50%);
        }

        .coverflow__element {
            position: absolute;
            left: 50%;
            width: 560px;
            height: 336px;
            margin-left: -280px;
            margin-top: -175px;
            transform-style: preserve-3d;
            transition: all 400ms cubic-bezier(0.01, 0.75, 0.34, 0.95);
            background: #fff;
            box-shadow: 0 20px 16px -2px rgba(0, 0, 0, 0.75);
            cursor: pointer;
        }

        .coverflow__image img {
            width: 100%;
        }

        .coverflow__title {
            font-family: Helvetica;
            margin-top: 1rem;
            padding-left: 1.5rem;
        }
    `]
})

export class HeroCoverflowComponent {
    index: number;
    list: Movie[];

    constructor() {
        this.index = parseInt(`${coverflowItems.length / 2}`);
        this.list = coverflowItems;
    }

    getNonFocussedElementStyle(loc: number, i: number, multiplier: number) {
        let translateX = (loc * 40 - 12 * multiplier);
        let rotateY = (loc * -90);
        let zIndex = (loc * multiplier);

        return {
            'transform': `translateX(${translateX}%) rotateY(${rotateY}deg) scale(.6)`,
            'z-index': `${zIndex}`
        };
    }

    getFocussedElementStyle(i: number) {
        return {
            'transform': `translateZ(0)`;
        };
    }

    changeIndex(i: number) {
        this.index = i;
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

    @HostListener('document:keyup', ['$event'])
    listenToKeystrokes(ev: KeyboardEvent) {
        if (ev.key === 37) {
            this.goLeft();
        } else if (ev.key === 39) {
            this.goRight();
        }
    }

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