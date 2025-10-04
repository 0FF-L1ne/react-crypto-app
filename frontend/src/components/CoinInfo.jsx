import { Flex, Typography } from 'antd'

const CoinInfo = ({ coin, withSymbol }) => {
	return (
		<>
			<Flex align='center'>
				<img src={coin.icon} alt={coin.name} style={{ width: '2.5rem', marginRight: '0.7rem' }} />
				<Typography.Title level={2} style={{ margin: 0 }}>
					{withSymbol && <span>({coin.symbol})</span>} {coin.name}
				</Typography.Title>
			</Flex>
		</>
	)
}

export default CoinInfo
