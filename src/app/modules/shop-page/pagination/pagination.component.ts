import {
  Component,
  ChangeDetectionStrategy,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/core/interfaces/page';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges, OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  @Input() pageData!: Page;

  currentPage: number = 0;
  pageNumbers: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageData'] && this.pageData) {
      this.pageNumbers = [...Array(this.pageData.totalPages).keys()];
    }
  }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(untilDestroyed(this)).subscribe(queryMap => {
      const page = queryMap.get('page');
      if (page) {
        this.currentPage = +page;
      } else {
        this.currentPage = 0;
      }
    });
  }

  setPage(num: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: num === 0 ? { page: undefined } : { page: num },
      queryParamsHandling: 'merge',
    });

    //after page change scroll to top of product list, 100 is menu height
    const scrollHeight = window.innerHeight - 100;
    window.scrollTo({ top: scrollHeight, behavior: 'smooth' });
  }
}
