import { Counter } from './Counter'
import { RepositoryList } from './RepositoryList'
import './styles/global.scss'

export function App() {
    return (
        <div>
            <RepositoryList />
            <Counter />
        </div>
    )
}
