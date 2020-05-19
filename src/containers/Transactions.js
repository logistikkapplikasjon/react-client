import React, { useState, useEffect } from 'react';
import apiCall from '../functions/apiCall';
import { Container, Row, Col, Input, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Loading from './Loading';
import useInput from '../functions/useInput';
import TransactionList from '../components/Lists/TransactionList';
/**
 * Container for showing transaction information.
 *
 * @component
 */

const Transactions = () => {
  const [company, setCompany] = useState();
  const [fetching, setFetching] = useState(true);
  const [input, handleChange] = useInput();
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    const getCompany = async () => {
      try {
        setFetching(true);
        const response = await apiCall('company', 'GET');
        setCompany(response.result[0]);
        setFetching(false);
      } catch (error) {
        console.log(error);
        setFetching(false);
      }
    };
    getCompany();
  }, []);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        if (input.toDate && input.fromDate) {
          setFetching(true);
          const params = {
            APIkey: company.apikey,
            toDate: input.toDate,
            fromDate: input.fromDate,
          };

          const response = await apiCall(
            `transactions?fromDate=${params.fromDate}&toDate=${params.toDate}&APIkey=${params.APIkey}`,
            'GET'
          );
          setTransactions(response.result);
        }
        setFetching(false);
      } catch (error) {
        console.log(error);
        setFetching(false);
      }
    };
    getTransactions();
  }, [company, input.toDate, input.fromDate]);

  return (
    <Container>
      {fetching ? (
        <Loading />
      ) : (
          <>
            <Row>
              <Col>
                <Row><h1>{company && company.name}</h1></Row>
                <Row>ApiNøkkel: {company && company.apikey}</Row>
              </Col>
            </Row>
            <br />
            <Row>
              <Breadcrumb>
                <BreadcrumbItem>Transaksjoner</BreadcrumbItem>
              </Breadcrumb>
            </Row>
            <br />
            <Row>
              <Col xs='4'>Fra dato:</Col>
              <Col xs='4'>Til dato:</Col>
            </Row>
            <br />
            <Row>
              <Col xs='4'>
                <Input
                  type='date'
                  name='fromDate'
                  onChange={handleChange}
                  defaultValue={input.fromDate}
                ></Input>
              </Col>
              <Col xs='4'>
                <Input
                  type='date'
                  name='toDate'
                  onChange={handleChange}
                  defaultValue={input.toDate}
                ></Input>
              </Col>
            </Row>
            <br />
            <Row>
              <TransactionList transactions={transactions} />
            </Row>
          </>
        )}
    </Container>
  );
};
export default Transactions;
