import { cryptoData, cryptoAssets } from './data'

export const fakeFetchData = () => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(cryptoData)
		}, 1000)
	})
}

export const fetchAssets = () => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(cryptoAssets)
		}, 1000)
	})
}
