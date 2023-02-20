import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import nProgress from "nprogress";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MyApp: AppType = ({ Component, pageProps }) => {
    const router = useRouter();

    nProgress.configure({ showSpinner: false });

    useEffect(() => {
        function handleChangeStart() {
            nProgress.start();
        }

        function handleChangeComplete() {
            nProgress.done();
        }

        router.events.on("routeChangeStart", handleChangeStart);
        router.events.on("routeChangeComplete", handleChangeComplete);
    }, [router.events]);

    return <Component data-theme="my-theme" {...pageProps} />;
};

export default api.withTRPC(MyApp);
