import AppLayout from './components/layout/AppLayout'
import { CryptoContextProvider } from './context/crypto-context'

const App = () => (
	<CryptoContextProvider>
		<AppLayout />
	</CryptoContextProvider>
)
export default App
