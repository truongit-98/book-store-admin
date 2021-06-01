import BaseRequest from './BaseRequest';

const schema = 'books';
/**
 * key base on host:port
 */
export default class ProductRequest extends BaseRequest {
  /**
   * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
   */

  fetchProducts(params) {
    const url = `${schema}/paginate`;
    return this.get(url, params);
  }

  searchProducts(params) {
    const url = `${schema}/search`;
    return this.get(url, params);
  }

  fetchBookSeries() {
    const url = `${schema}/series`;
    return this.get(url);
  }
  fetchBookSeriesInfo(params) {
    const url = `${schema}/series${params.seriesID}`;
    return this.get(url);
  }
}
