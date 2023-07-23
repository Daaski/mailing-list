import scss from './Order.module.scss'

interface OrderProps {
    index: number
}

export const Order = ({index}: OrderProps) => {
    return (
        <div className={scss.order_wrapper}>
            <p className={scss.number}>{index + 1}</p>
        </div>
    )
}