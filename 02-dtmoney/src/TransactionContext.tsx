import { createContext, ReactNode, useEffect, useState } from "react"
import { api } from "./services/api"

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionContextProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => void;
}

export const TransactionContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
)

export function TransactionProvider({ children }: TransactionContextProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, [])

    function createTransaction(transaction: TransactionInput) {
        api.post('/transactions', transaction)
    }

    return (
        <TransactionContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}
