import { Layout, Select, Space, Button, ConfigProvider, Modal, Drawer } from 'antd'
import { createStyles } from 'antd-style'
import { useCrypto } from '../../context/crypto-context'
import { icons } from 'antd/es/image/PreviewGroup'
import { useEffect, useState } from 'react'
import CoinInfoModal from '../CoinInfoModal'
import AddAssetForm from '../AddAssetForm'

const headerStyle = {
	textAlign: 'center',
	width: '100%',
	height: 60,
	padding: '1rem',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}

const useStyle = createStyles(({ prefixCls, css }) => ({
	linearGradientButton: css`
		&.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
			> span {
				position: relative;
			}

			&::before {
				content: '';
				background: linear-gradient(135deg, #6253e1, #04befe);
				position: absolute;
				inset: -1px;
				opacity: 1;
				transition: all 0.3s;
				border-radius: inherit;
			}

			&:hover::before {
				opacity: 0;
			}
		}
	`,
}))

const AppHeader = () => {
	const [select, setSelect] = useState(false)
	const [coin, setCoin] = useState(null)
	const [modal, setModal] = useState(false)
	const [drawer, setDrawer] = useState(false)
	const { styles } = useStyle()
	const { crypto } = useCrypto()

	useEffect(() => {
		const keypress = event => {
			if (event.key === '/') {
				setSelect(prev => !prev)
			}
		}
		document.addEventListener('keypress', keypress)
		return () => document.removeEventListener('keypress', keypress)
	}, [])

	const handleSelect = value => {
		setCoin(crypto.find(c => c.id === value))
		setModal(true)
	}

	return (
		<Layout.Header style={headerStyle}>
			<Select
				open={select}
				onSelect={handleSelect}
				onClick={() => setSelect(prev => !prev)}
				style={{ width: '20rem' }}
				value='press / to open'
				options={crypto.map(coin => ({
					label: coin.name,
					value: coin.id,
					icon: coin.icon,
				}))}
				optionRender={option => (
					<Space>
						<img
							src={option.data.icon}
							alt={option.data.value}
							style={{
								width: '1.6rem',
							}}
						/>{' '}
						{option.data.label}
					</Space>
				)}
			/>
			<ConfigProvider
				button={{
					className: styles.linearGradientButton,
				}}
			>
				<Space>
					<Button type='primary' size='large' onClick={() => setDrawer(true)}>
						Add Assets
					</Button>
				</Space>
			</ConfigProvider>
			<Modal
				// style={{ top: '20rem' }}
				closable={{ 'aria-label': 'Custom Close Button' }}
				open={modal}
				onOk={() => setModal(false)}
				onCancel={() => setModal(false)}
				footer={null}
			>
				<CoinInfoModal coin={coin} />
			</Modal>

			<Drawer
				width={600}
				title='Add Asset'
				closable={{ 'aria-label': 'Close Button' }}
				onClose={() => setDrawer(false)}
				open={drawer}
				destroyOnClose
			>
				<AddAssetForm onClose={() => setDrawer(false)} />
			</Drawer>
		</Layout.Header>
	)
}

export default AppHeader
