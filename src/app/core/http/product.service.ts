import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Product } from '../interfaces/product';
import { ProductCategory } from '../interfaces/product-category';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Page } from '../interfaces/page';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.apiUrl + '/products';

  private categoryUrl = environment.apiUrl + '/product-category';

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
  ) {}

  getAllProdcts(paramMap: ParamMap) {
    let url = this.baseUrl;
    if (paramMap.get('id')) {
      url = url + `/search/findByCategoryId`;
    }

    return this.getProductListPaginate(url , paramMap);
  }

  getProduct(theProductId: number): Observable<Product> {
    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  private getProductListPaginate(
    url:string,
   paramMap:ParamMap
  ): Observable<GetResponseProducts> {
    let httpParams = new HttpParams();
    paramMap.keys.forEach(key => {
      httpParams = httpParams.set(key, paramMap.get(key)!);
    });
    httpParams = httpParams.appendAll({'size': 4});
   
    return this.httpClient.get<GetResponseProducts>(url, {params: httpParams});
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map(response => response._embedded.productCategory));
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: Page;
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
