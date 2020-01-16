import useRouter from './useRouter'

const useHistory = () => {
    const { history } = useRouter()
    return history
}

export default useHistory