/* eslint-disable max-lines-per-function */
import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { ParamMap, convertToParamMap } from '@angular/router';
import { environment } from '../../../environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiUrl + '/products';
  const categoryUrl = environment.apiUrl + '/product-category';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products without category ID', (done) => {
    const paramMap:ParamMap = convertToParamMap({}) 
    const mockResponse = { _embedded: { products: [] }, page: {} };

    service.getAllProdcts(paramMap).subscribe(response => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(baseUrl + '?size=24');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get all products with category ID', (done) => {
    const paramMap:ParamMap = convertToParamMap({id:1}) 
    const mockResponse = { _embedded: { products: [] }, page: {} };

    service.getAllProdcts(paramMap).subscribe(response => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(baseUrl + '/search/findByCategoryId?id=1&size=24');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get product by ID', (done) => {
    const mockProductId = 1;
    const mockProduct = { id: mockProductId, name: 'Sample Product' };

    service.getProduct(mockProductId).subscribe(response => {
      expect(response).toEqual(mockProduct);
      done()
    });

    const req = httpMock.expectOne(baseUrl + `/${mockProductId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should get product categories', (done) => {
    const mockCategoryResponse = { _embedded: { productCategory: [{id:1, categoryName:'mugs'}] }} ;

    service.getProductCategories().subscribe(response => {
      expect(response).toEqual([{id:1, categoryName:'mugs'}]);
      done()
    });

    const req:TestRequest = httpMock.expectOne({url:categoryUrl, method: 'GET'});
    expect(req.request.method).toBe('GET');
    req.flush(mockCategoryResponse);
  });
});
