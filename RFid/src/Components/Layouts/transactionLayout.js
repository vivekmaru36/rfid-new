const TransactionData = ({ transactions }) => {
    return (
        <>
            {transactions.map((transaction, index) => {
                return (
                    <tr key={index}>
                        
                        <td>{transaction.credit}</td>
                        <td>{transaction.debit}</td>
                        <td>{transaction.transactionDate}</td>
                        <td>{transaction.totalBalance}</td>
                    </tr>
                );
            })}
        </>
    );
};

export default TransactionData;
