import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  template: `
    <div class="star-rating">
      <span *ngFor="let star of stars" [class.filled]="star.filled" [class.half]="star.half">★</span>
      <span class="rating-value">{{ rating }}</span>
    </div>
  `,
  styles: [`
    .star-rating {
      font-size: 24px;
      color: #ccc;
    }
    .star-rating .filled {
      color: gold;
    }
    .star-rating .half {
      position: relative;
    }
    .star-rating .half:before {
      position: absolute;
      content: '★';
      width: 50%;
      overflow: hidden;
      color: gold;
    }
    .rating-value {
      font-size: 16px;
      margin-left: 5px;
      vertical-align: middle;
    }
  `]
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  stars: {filled: boolean, half: boolean}[] = [];

  ngOnChanges() {
    this.stars = [];
    const fullStars = Math.floor(this.rating);
    const hasHalfStar = this.rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        this.stars.push({filled: true, half: false});
      } else if (i === fullStars + 1 && hasHalfStar) {
        this.stars.push({filled: false, half: true});
      } else {
        this.stars.push({filled: false, half: false});
      }
    }
  }
}