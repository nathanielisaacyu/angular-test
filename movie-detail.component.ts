import { Component, Input } from '@angular/core';
import { Movie } from './movie';

@Component({
  selector: 'movie-detail',
  template: `
	<div>
		<h2>{{movie.title}}</h2>
		<div><label>Image source: </label>{{movie.image}}</div>
		<label>Trailer: </label>
	</div>`
})

export class MovieDetailComponent {
	@Input() movie: Movie;
}