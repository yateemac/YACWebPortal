import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private url = 'http://api.yateemac.net:5000/api/reports';

  constructor(private http: HttpClient) { }

  refreshData() {
    return this.http.get(this.url + '/refreshData')
  }

  getTrialBalance(year: string) {
    return this.http.get(this.url + '/financials/trialBalance/' + year)
  }

  getAllHighValProds() {
    return this.http.get(this.url + '/highValueProd')
  }

  getAllLocWiseStock() {
    return this.http.get(this.url + '/locWiseStockVal')
  }

  getAllSubCatWiseStock() {
    return this.http.get(this.url + '/subCatWiseStockVal')
  }

  getAllAgreements() {
    return this.http.get(this.url + '/allAgreementsSMC')
  }

  getReceivablesAgeing(date: string) {
    return this.http.get(this.url + '/receivables/ageing/' + date)
  }

  getPayablesAgeing(date: string) {
    return this.http.get(this.url + '/payables/ageing/' + date)
  }

  getCustWiseAgeing(custCode:string, date: string) {
    return this.http.get(this.url + '/custAgeing/' + custCode + '/' + date)
  }

  getAllWorkOrders(jobNo: string) {
    return this.http.get(this.url + '/allWorkOrders/' + jobNo)
  }

  getItemwiseSales(year: string) {
    return this.http.get(this.url + '/tradingTotalSales/' + year)
  }

  getShowroomItemwiseSales(year: string) {
    return this.http.get(this.url + '/tradingTotalSales/showroom/' + year)
  }

  getOneStopShopItemwiseSales(year: string) {
    return this.http.get(this.url + '/tradingTotalSales/oneStopShop/' + year)
  }

  getMonthwiseShowroomSales(year: string) {
    return this.http.get(this.url + '/monthwiseShowroomSales/' + year)
  }

  getMonthwiseOneStopShopSales(year: string) {
    return this.http.get(this.url + '/monthwiseOneStopShopSales/' + year)
  }

  getDaywiseShowroomSales(date: string) {
    return this.http.get(this.url + '/daywiseShowroomSales/' + date)
  }

  getDaywiseOneStopShopSales(date: string) {
    return this.http.get(this.url + '/dayWiseOneStopShopSales/' + date)
  }

  getDeptWiseTotalSalesShowroom(year: string) {
    return this.http.get(this.url + '/deptwiseSales/showroom/' + year)
  }

  getDeptWiseTotalSalesOneStopShop(year: string) {
    return this.http.get(this.url + '/deptwiseSales/oneStopShop/' + year)
  }

  getDeptWiseTotalSalesServiceDept(year: string) {
    return this.http.get(this.url + '/deptwiseSales/serviceDept/' + year)
  }

  getDeptWiseTotalSalesContracts(year: string) {
    return this.http.get(this.url + '/deptwiseSales/contracts/' + year)
  }

}
