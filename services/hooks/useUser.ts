import { getCookie } from 'cookies-next';
import useSWR from 'swr'
import axiosInstance from '@/services/axios/clientfetch';
import { TOKEN_KEY } from '@/services/constants';

interface IReturnType {
    user: any;
    mutateUser: any;
    errorUser: any;
    validatingUser: any;
}

const fetcher = (url: any) => axiosInstance(url).then(res => res);

function useUser(): IReturnType {
    const token = getCookie(TOKEN_KEY)

    const { data: user, mutate: mutateUser, error: errorUser, isValidating: validatingUser } =
        useSWR(0 ? '/admin/user'
            : null,
            fetcher
        )

    return { user, mutateUser, errorUser, validatingUser }
}

export default useUser;