import { Divider, Select, Space, Button, Form, InputNumber, DatePicker, Result } from 'antd'
import { useState, useRef } from 'react'
import { useCrypto } from '../context/crypto-context'
import CoinInfo from './CoinInfo'

const AddAssetForm = ({ onClose }) => {
	const [form] = Form.useForm()
	const { crypto, addAsset } = useCrypto()
	const [coin, setCoin] = useState(null)
	const [submitted, setSumbmitted] = useState(false)
	const assetRef = useRef()

	const onFinish = values => {
		console.log(values)

		const newAsset = {
			id: coin.id,
			amount: values.amount,
			price: values.price,
			date: values.date?.$d ?? new Date(),
		}
		assetRef.current = newAsset
		setSumbmitted(true)
		addAsset(newAsset)
	}

	const handleAmountChange = value => {
		const price = form.getFieldValue('price')
		form.setFieldsValue({
			total: +(value * price).toFixed(2),
		})
	}

	const handlePriceChange = value => {
		const amount = form.getFieldValue('amount')
		form.setFieldsValue({
			total: +(amount * value).toFixed(2),
		})
	}

	const validateMessages = {
		required: '${label} is reqired!',
		types: {
			number: '${label} is not valid number',
		},
		number: {
			range: '${label} must be between ${min} and ${max}',
		},
	}

	if (!coin) {
		return (
			<Select
				onSelect={v => setCoin(crypto.find(c => c.id === v))}
				style={{ width: '100%' }}
				placeholder='Select coin'
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
						/>
						{option.data.label}
					</Space>
				)}
			/>
		)
	}

	if (submitted) {
		return (
			<Result
				status='success'
				title='New asset was added!'
				subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
				extra={[
					<Button type='primary' key='console' onClick={onClose}>
						Close
					</Button>,
				]}
			/>
		)
	}

	return (
		<>
			<Form
				form={form}
				name='basic'
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 10 }}
				style={{ maxWidth: '35rem' }}
				initialValues={{
					price: +coin.price.toFixed(2),
				}}
				onFinish={onFinish}
				validateMessages={validateMessages}
			>
				<CoinInfo coin={coin} />
				<Divider />
				<Form.Item
					label='Amount'
					name='amount'
					rules={[
						{
							required: true,
							type: 'number',
							min: 0,
						},
					]}
				>
					<InputNumber style={{ width: '100%' }} placeholder='Enter coin amount' onChange={handleAmountChange} />
				</Form.Item>

				<Form.Item label='Price' name='price'>
					<InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item label='Date & Time' name='date'>
					<DatePicker showTime />
				</Form.Item>

				<Form.Item label='Total' name='total'>
					<InputNumber disabled style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item label={null}>
					<Button type='primary' htmlType='submit'>
						Add Asset
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

export default AddAssetForm
