import React from "react"
import Mobile from "./mobile"
import Desktop from "./desktop"
import { useSubscription, useLazyQuery, useQuery } from "@apollo/react-hooks"
import { AuthContext } from "Root/contexts/auth"
import { SnackBarContext } from "Root/contexts/snackbar"
import { NotificationsContext } from "Root/contexts/notifications"
import { ThemeProvider } from "styled-components"
import api from "Root/api"
import C from "Root/constants"
import GlobalStyles from "Root/constants/globalStyles"
import Initialize from "Root/components/global/Initialize"
import useHistory from "Root/hooks/useHistory"

const Client = props => {
    const { auth, dispatch: authDispatch } = React.useContext(AuthContext)
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
    const history = useHistory()

    window.addEventListener("resize", () => {
        setWindowWidth(window.innerWidth)
    })

    const [getProfileUser, getProfileUserResponse] = useLazyQuery(
        api.auth.getUserProfile,
    )

    React.useEffect(() => {
        if (!auth.id) {
            getProfileUser()
        }
        if (getProfileUserResponse.data) {
            if (
                !getProfileUserResponse.data.getUserProfileForUser &&
                getProfileUserResponse.called &&
                !getProfileUserResponse.loading &&
                auth.token
            ) {
                history.push("/logout")
            }
            authDispatch({
                type: "LOGIN",
                data: getProfileUserResponse.data.getUserProfileForUser,
            })
        }
    }, [getProfileUserResponse.data])

    return (
        <ThemeProvider
            theme={{
                colors: {
                    ...C.themes[auth.theme || "light"].colors,
                    ...C.themes[auth.theme || "light"].colors[
                        `${auth.color}Pack`
                    ],
                },
            }}>
            <>
                <GlobalStyles />
                {auth.id && <Initialize />}
                {windowWidth > 960 ? <Desktop /> : <Mobile />}
            </>
        </ThemeProvider>
    )
}

export default Client
