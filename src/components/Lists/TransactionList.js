import React from 'react';
import { Col, Row, Container } from 'reactstrap';

/**
 * Component for showing a list of transactions.
 * @component
 * @param {props} props props passed from container
 */
const TransactionList = (props) => {
  const { transactions } = props;
  return (
    <Container>
      {transactions &&
        transactions.map((transaction) => {
          return (
            <div key={transaction.transaction_id}>
              <Row>
                <Col>ID: {transaction.transaction_id}</Col>
                <Col>Dato: {transaction.date.slice(0, 10)}</Col>

                <Col>Vare: {transaction.item_id}</Col>
                <Col>Antall: {transaction.amount}</Col>
                <Col>Prosjekt: {transaction.project_id}</Col>
                <Col>Utført av: {transaction.user_id}</Col>
              </Row>
              <hr />
            </div>
          );
        })}
    </Container>
  );
};
export default TransactionList;
