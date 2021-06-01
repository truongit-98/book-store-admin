import { connect } from 'react-redux';
import ProductManagement from '../component/products/ProductManagement'
import actions from '../redux/actions/products'
const mapStateToProps = (state) => ({
  listProducts: state.products.listProducts,
  series: state.products.series
  });
  const mapDispatchToProps = (dispatch) => ({
    productsListAction: (params, callback) => {
      dispatch(actions.fetchProducts(params, callback));
    },
    searchProducts: (params, callback) => {
      dispatch(actions.fetchProductSearch(params, callback));
    },
    fetchBookSeries: (callback) => {
      dispatch(actions.fetchProductsType(callback));
    },
    fetchBookSeriesInfo: (params, callback) => {
      dispatch(actions.fetchProductsTypeInfo(params, callback));
    },
  });
export default connect(mapStateToProps, mapDispatchToProps)(ProductManagement)