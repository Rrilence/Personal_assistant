
import { useAppSelector } from '../hooks/reduxHooks'

export const useCategory = () => {
    const rentCost = useAppSelector((state) => state.category.rentCost)
    const eatCost = useAppSelector((state) => state.category.eatCost)
    const transportCost = useAppSelector((state) => state.category.transportCost)
    const clothCost = useAppSelector((state) => state.category.clothCost)
    const entertainmentCost = useAppSelector((state) => state.category.entertainmentCost)

    return [rentCost, eatCost, transportCost, clothCost, entertainmentCost]
}