import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import useSWR from 'swr'
import axiosInstance from '@/services/axios/clientfetch';
import { EXCLUDE_ROUTES, USER_TYPE_KEY } from '@/services/constants';
import { appDecrypt } from '../helper';

interface IReturnType {
    user: any;
    mutateUser: any;
    errorUser: any;
    validatingUser: any;
}

const fetcher = (url: any) => axiosInstance(url).then(res => res);

function useUser(): IReturnType {
    const router = useRouter();
    const isPrivateRoute = !EXCLUDE_ROUTES.includes(router.pathname);
    const userType = getCookie(USER_TYPE_KEY) && appDecrypt(getCookie(USER_TYPE_KEY) + "");

    const { data: user, mutate: mutateUser, error: errorUser, isValidating: validatingUser } =
        useSWR(
            isPrivateRoute && userType
                ? getFetchUserUrl(userType)
                : null,
            fetcher
        )

    return { user, mutateUser, errorUser, validatingUser }
}

function getFetchUserUrl(userType: "superadmin" | "hoteladmin" | "customer" | any) {
    switch (userType) {
        case "superadmin":
            return '/admin/user'
        case "hoteladmin":
            return '/hotel/user'
        case "customer":
            return '/customer/user'

    }
}

export default useUser;