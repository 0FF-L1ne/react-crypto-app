import { useEffect, createContext, useState, useContext } from 'react'
import { fetchAssets, fakeFetchData } from '../api'
import { percentDifference } from '../utils'

const CryptoContext = createContext({
	assets: [],
	crypto: [],
	loading: false,
})

export const CryptoContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(false)
	const [crypto, setCrypto] = useState([])
	const [assets, setAssets] = useState([])

	const mapAssets = (assets, result) => {
		return assets.map(asset => {
			const coin = result.find(coin => coin.id === asset.id)
			return {
				grow: asset.price < coin.price,
				growPercent: percentDifference(asset.price, coin.price),
				totalAmount: asset.amount * coin.price,
				totalProfit: asset.amount * coin.price - asset.amount * asset.price,
				name: coin.name,
				...asset,
			}
		})
	}

	useEffect(() => {
		const preload = async () => {
			setLoading(true)
			const { result } = await fakeFetchData()
			const assets = await fetchAssets()
			setAssets(mapAssets(assets, result))
			setCrypto(result)
			setLoading(false)
		}
		preload()
	}, [])

	const addAsset = newAsset => {
		setAssets(prev => mapAssets([...prev, newAsset], crypto))
	}

	return <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>{children}</CryptoContext.Provider>
}

export default CryptoContext

export const useCrypto = () => {
	return useContext(CryptoContext)
}
