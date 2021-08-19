import { Container } from "./styles";
import incomeSvg from '../../assets/income.svg'
import outcomeSvg from '../../assets/outcome.svg'
import totalSvg from '../../assets/total.svg'
import { useContext } from "react";
import { TransactionContext } from "../../TransactionContext";

export function Summary() {
    const { transactions } = useContext(TransactionContext)

    const incomeTotal = transactions
        .filter(transaction => transaction.type === 'deposit')
        .reduce((previousValue, transaction) => previousValue + transaction.amount, 0)

    const outcomeTotal = transactions
        .filter(transaction => transaction.type === 'withdraw')
        .reduce((previousValue, transaction) => previousValue + transaction.amount, 0)

    const total = incomeTotal - outcomeTotal

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeSvg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(incomeTotal)}
                </strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeSvg} alt="Saídas" />
                </header>
                <strong>
                    - {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(outcomeTotal)}
                </strong>
            </div>

            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalSvg} alt="Total" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(total)}
                </strong>
            </div>
        </Container>
    )
}
