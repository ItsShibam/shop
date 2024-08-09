import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to={"/"} className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant={"danger"}>
          {isError?.data?.message || isError?.error}
        </Message>
      ) : (
        <div>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((p) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <Product product={p} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </div>
      )}
    </>
  );
};

export default HomeScreen;
